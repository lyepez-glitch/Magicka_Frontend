// src/services/apiService.js
import axios from 'axios';
const backendUrl =
    import.meta.env.VITE_RENDER_URL;
const api = axios.create({
    baseURL: backendUrl, // Django example
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for authentication tokens (if needed)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // const message = error.response ? .data ? .message || 'Something went wrong.';
        // console.error(message);
        return Promise.reject(error);
    }
);

export default api;