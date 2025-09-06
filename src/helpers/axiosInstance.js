import axios from "axios";
import { BASE_URL } from "../baseUrl.js";
import toast from "react-hot-toast";
import { isUserLoggedIn, clearAuthData, shouldAttemptAuth } from "./authUtils.js";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Remove Content-Type header for FormData to allow browser to set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error('URL:', originalRequest?.url);
    console.error('Method:', originalRequest?.method?.toUpperCase());
    console.error('Response Data:', error.response?.data);

    // Handle network errors
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
      toast.error('Network error. Please check your connection.');
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