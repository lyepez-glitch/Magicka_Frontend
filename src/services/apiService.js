// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://magicka-app.onrender.com/', // Django example
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