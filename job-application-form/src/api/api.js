// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this URL to match your backend
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = token;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
