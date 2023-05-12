// Import external dependencies
import axios from 'axios';
import Cookies from 'js-cookie';

// Define environment variables
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://gigsteria-api.onrender.com'
  : 'http://localhost:8800';

// Define an axios instance with some default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add an interceptor to automatically add the access token to requests
api.interceptors.request.use((config) => {
  // Retrieve the access token from the cookie
  const accessToken = Cookies.get('accessToken');

  // If an access token exists, add it to the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Export the configured axios instance
export default api;
