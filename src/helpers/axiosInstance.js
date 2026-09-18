import axios from "axios";
import { BASE_URL } from "../baseUrl.js";
import toast from "react-hot-toast";
import { isUserLoggedIn, clearAuthData, shouldAttemptAuth } from "./authUtils.js";

let pendingRequestsCount = 0;
let coldStartTimer = null;
let coldStartToastId = null;

const startColdStartTimer = () => {
  pendingRequestsCount++;
  if (!coldStartTimer && !coldStartToastId) {
    coldStartTimer = setTimeout(() => {
      if (pendingRequestsCount > 0 && !coldStartToastId) {
        coldStartToastId = toast.loading(
          "Backend is connecting... Please be patient while the server wakes up",
          {
            id: "render-cold-start-toast",
            duration: Infinity,
            style: {
              background: "#1e293b",
              color: "#ffffff",
              border: "1px solid #6366f1"
            }
          }
        );
      }
    }, 1500); // 1.5 seconds threshold
  }
};

const clearColdStartTimer = () => {
  pendingRequestsCount = Math.max(0, pendingRequestsCount - 1);
  if (pendingRequestsCount === 0) {
    if (coldStartTimer) {
      clearTimeout(coldStartTimer);
      coldStartTimer = null;
    }
    if (coldStartToastId) {
      toast.dismiss("render-cold-start-toast");
      toast.success("Backend connected!", { duration: 3000, id: "backend-connected-success" });
      coldStartToastId = null;
    }
  }
};

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 60000, // 60 second timeout for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    startColdStartTimer();

    // Attach Bearer token from localStorage as a fallback for cross-site remote authentication
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove Content-Type header for FormData to allow browser to set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    clearColdStartTimer();
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    clearColdStartTimer();
    return response;
  },
  async (error) => {
    clearColdStartTimer();
    const originalRequest = error.config;

    console.error('URL:', originalRequest?.url);
    console.error('Method:', originalRequest?.method?.toUpperCase());
    console.error('Response Data:', error.response?.data);

    // Handle network errors / timeouts
    if (!error.response) {
      console.error('Network Error Details:', {
        code: error.code,
        message: error.message,
        config: {
          url: originalRequest?.url,
          method: originalRequest?.method,
          timeout: originalRequest?.timeout
        }
      });
      if (error.code === 'ECONNABORTED') {
        toast.error('Backend connection timed out. Server may still be starting up, please try again in a moment.');
      } else {
        toast.error('Network error. Please check your backend connection.');
      }
      return Promise.reject(error);
    }

    const { status } = error.response;

    // Handle different HTTP status codes
    switch (status) {
      case 401:
        // If this is a refresh token request that failed, don't retry
        if (originalRequest.url?.includes('/refresh_token')) {
          console.log('Refresh token request failed - user not logged in');
          clearAuthData();
          return Promise.reject(error);
        }

        // Check if user appears to be logged in before attempting refresh
        if (!isUserLoggedIn()) {
          console.log('User not logged in - skipping token refresh');
          // Only show error for requests that require authentication
          if (shouldAttemptAuth(originalRequest.url)) {
            console.log('Authentication required for:', originalRequest.url);
          }
          clearAuthData();
          return Promise.reject(error);
        }

        // Check if this is not already a retry
        if (!originalRequest._retry && shouldAttemptAuth(originalRequest.url)) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh the token
            console.log('Attempting token refresh for:', originalRequest.url);
            const refreshResponse = await axiosInstance.post('/users/refresh_token', {});

            if (refreshResponse.status === 200) {
              // Token refreshed successfully, retry the original request
              console.log('Token refreshed successfully, retrying request');
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed - user needs to login
            console.log('Token refresh failed - clearing auth data');

            // Only show toast for important requests
            if (shouldAttemptAuth(originalRequest.url) && !originalRequest.url?.includes('/current_user')) {
              toast.error('Session expired. Please login again.');
            }

            clearAuthData();

            // Only redirect if we're not already on login page
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
              window.location.href = '/login';
            }

            return Promise.reject(refreshError);
          }
        } else {
          // This was already a retry or doesn't require auth - don't try again
          console.log('Skipping retry for:', originalRequest.url);
          clearAuthData();
          return Promise.reject(error);
        }
        break;

      case 403:
        toast.error('Access forbidden. You don\'t have permission.');
        break;

      case 404:
        toast.error('Resource not found.');
        break;

      case 429:
        toast.error('Too many requests. Please try again later.');
        break;

      case 500:
        toast.error('Server error. Please try again later.');
        break;

      default:
        // Let the component handle other errors
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;