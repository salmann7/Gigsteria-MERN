import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_APP_NODE_ENV === 'production'
  ? 'https://gigsteria-api.onrender.com/'
  : 'http://localhost:8800';

const accessToken = Cookies.get('accessToken')

const api = axios.create({
    baseURL: API_URL,
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
    withCredentials: true,
});

export default api;