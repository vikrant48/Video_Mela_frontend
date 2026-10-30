// Utility functions for authentication state management

/**
 * Check if user appears to be logged in based on available indicators
 * This helps prevent unnecessary API calls when user is clearly not authenticated
 *
 * The auth tokens themselves are httpOnly cookies, invisible to page scripts by design,
 * so the cached profile is the only client-side hint of a session.
 */
export const isUserLoggedIn = () => {
  const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
  return !!userData;
};

/**
 * Clear all authentication data held by the page
 * (the httpOnly auth cookies can only be cleared by the server, via /users/logout)
 */
export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
  }
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
