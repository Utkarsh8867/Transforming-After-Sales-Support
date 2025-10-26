import axios from 'axios';

// API Configuration from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

// API Endpoints
const ENDPOINTS = {
    AUTH: process.env.REACT_APP_AUTH_ENDPOINT || '/auth',
    QUERIES: process.env.REACT_APP_QUERIES_ENDPOINT || '/queries',
    ADMIN: process.env.REACT_APP_ADMIN_ENDPOINT || '/admin',
    AI: process.env.REACT_APP_AI_ENDPOINT || '/ai',
};

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post(`${ENDPOINTS.AUTH}/login`, credentials),
    register: (userData) => api.post(`${ENDPOINTS.AUTH}/register`, userData),
    getCurrentUser: () => api.get(`${ENDPOINTS.AUTH}/me`),
    updatePreferences: (preferences) => api.put(`${ENDPOINTS.AUTH}/preferences`, { preferences }),
};

// Queries API
export const queriesAPI = {
    getQueries: (params) => api.get(ENDPOINTS.QUERIES, { params }),
    getQuery: (id) => api.get(`${ENDPOINTS.QUERIES}/${id}`),
    createQuery: (queryData) => api.post(ENDPOINTS.QUERIES, queryData),
    rateQuery: (id, rating) => api.post(`${ENDPOINTS.QUERIES}/${id}/rate`, rating),
};

// Admin API
export const adminAPI = {
    getDashboard: () => api.get(`${ENDPOINTS.ADMIN}/dashboard`),
    getQueries: (params) => api.get(`${ENDPOINTS.ADMIN}/queries`, { params }),
    getQuery: (id) => api.get(`${ENDPOINTS.ADMIN}/queries/${id}`),
    respondToQuery: (id, response) => api.post(`${ENDPOINTS.ADMIN}/queries/${id}/respond`, response),
    updateQueryStatus: (id, update) => api.patch(`${ENDPOINTS.ADMIN}/queries/${id}/status`, update),
};

// AI API
export const aiAPI = {
    analyzeText: (text) => api.post(`${ENDPOINTS.AI}/analyze`, { text }),
    generateResponse: (query, category, context) =>
        api.post(`${ENDPOINTS.AI}/generate-response`, { query, category, context }),
};

// Export configuration for use in other components
export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    API_URL,
    VERSION: API_VERSION,
    ENDPOINTS,
};

export default api;