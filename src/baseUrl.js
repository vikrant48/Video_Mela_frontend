// Base URL configuration for different environments
const getBaseUrl = () => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;
  
  // Get the backend URL from environment variables
  const envBackendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Fallback URLs for different environments
  const fallbackUrls = {
    development: 'http://localhost:8000/api/v1',
    production: 'https://videomela-backend.onrender.com/api/v1'
  };
  
  // Return the appropriate URL
  if (envBackendUrl) {
    return envBackendUrl;
  }
  
  return isDevelopment ? fallbackUrls.development : fallbackUrls.production;
};

export const BASE_URL = getBaseUrl();

// Export for debugging purposes
export const ENV_INFO = {
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  baseUrl: BASE_URL
};