import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
    updatePreferences: (preferences) => api.put('/auth/preferences', { preferences }),
};

// Queries API
export const queriesAPI = {
    getQueries: (params) => api.get('/queries', { params }),
    getQuery: (id) => api.get(`/queries/${id}`),
    createQuery: (queryData) => api.post('/queries', queryData),
    rateQuery: (id, rating) => api.post(`/queries/${id}/rate`, rating),
};

// Admin API
export const adminAPI = {
    getDashboard: () => api.get('/admin/dashboard'),
    getQueries: (params) => api.get('/admin/queries', { params }),
    getQuery: (id) => api.get(`/admin/queries/${id}`),
    respondToQuery: (id, response) => api.post(`/admin/queries/${id}/respond`, response),
    updateQueryStatus: (id, update) => api.patch(`/admin/queries/${id}/status`, update),
};

// AI API
export const aiAPI = {
    analyzeText: (text) => api.post('/ai/analyze', { text }),
    generateResponse: (query, category, context) =>
        api.post('/ai/generate-response', { query, category, context }),
};

export default api;