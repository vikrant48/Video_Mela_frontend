// Utility functions for authentication state management

/**
 * Check if user appears to be logged in based on available indicators
 * This helps prevent unnecessary API calls when user is clearly not authenticated
 */
export const isUserLoggedIn = () => {
  // Check if there's user data in localStorage
  const userData = localStorage.getItem('userData');
  
  // Check if there are any auth-related cookies
  const hasAuthCookies = document.cookie.includes('accessToken') || 
                        document.cookie.includes('refreshToken');
  
  return !!(userData || hasAuthCookies);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem('userData');
  
  // Clear auth cookies by setting them to expire
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

/**
 * Check if the current request should attempt authentication
 * Some requests (like public video listings) don't require auth
 */
export const shouldAttemptAuth = (url) => {
  const publicEndpoints = [
    '/video', // Public video listings
    '/users/register',
    '/users/login'
  ];
  
  return !publicEndpoints.some(endpoint => url.includes(endpoint));
};