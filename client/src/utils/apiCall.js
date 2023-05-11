import axios from 'axios';
const API_URL = import.meta.env.VITE_APP_NODE_ENV === 'production'
  ? 'https://gigsteria-api.onrender.com/'
  : 'http://localhost:8800';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;