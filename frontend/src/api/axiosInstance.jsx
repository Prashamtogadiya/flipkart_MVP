import axios from 'axios';
import store from '../app/store';
import { refreshAccessToken, logout } from '../features/auth/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Always send cookies
});

// Handle 401 responses and try refreshing token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResult = await store.dispatch(refreshAccessToken());
        if (refreshResult.meta.requestStatus === 'fulfilled') {
          // No need to update Authorization header, cookie will be sent automatically
          return api(originalRequest);
        }
      } catch {
        await store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
