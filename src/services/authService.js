// src/services/authService.js
import api from './apiService';

export const login = async(credentials) => {

    const response = await api.post('/login/', credentials);
    return response.data;
};

export const signup = async(userData) => {
    const response = await api.post('/register/', userData);
    return response.data;
};