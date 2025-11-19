import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { authUtils } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 and refresh token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authUtils.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
