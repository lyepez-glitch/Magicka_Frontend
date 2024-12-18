// src/services/energyService.js
import api from './apiService';

export const launchAttack = async(attackData) => {
    const response = await api.post('/launchattack/', attackData);
    return response.data;
};