// Application Configuration
export const APP_CONFIG = {
    // Application Info
    name: process.env.REACT_APP_APP_NAME || 'AI Customer Service',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_NODE_ENV || 'development',

    // API Configuration
    api: {
        baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
        url: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
        version: process.env.REACT_APP_API_VERSION || 'v1',
        timeout: 10000, // 10 seconds
    },

    // Socket Configuration
    socket: {
        url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000',
        options: {
            transports: ['websocket', 'polling'],
            timeout: 20000,
            forceNew: true,
        },
    },

    // API Endpoints
    endpoints: {
        auth: process.env.REACT_APP_AUTH_ENDPOINT || '/auth',
        queries: process.env.REACT_APP_QUERIES_ENDPOINT || '/queries',
        admin: process.env.REACT_APP_ADMIN_ENDPOINT || '/admin',
        ai: process.env.REACT_APP_AI_ENDPOINT || '/ai',
    },

    // Feature Flags
    features: {
        aiEnabled: process.env.REACT_APP_ENABLE_AI_FEATURES === 'true',
        emailNotifications: process.env.REACT_APP_ENABLE_EMAIL_NOTIFICATIONS === 'true',
        realTime: process.env.REACT_APP_ENABLE_REAL_TIME === 'true',
    },

    // UI Configuration
    ui: {
        theme: process.env.REACT_APP_DEFAULT_THEME || 'light',
        itemsPerPage: parseInt(process.env.REACT_APP_ITEMS_PER_PAGE) || 10,
        maxFileSize: 10 * 1024 * 1024, // 10MB
    },

    // Full API URLs (for convenience)
    urls: {
        login: process.env.REACT_APP_LOGIN_URL || 'http://localhost:5000/api/auth/login',
        register: process.env.REACT_APP_REGISTER_URL || 'http://localhost:5000/api/auth/register',
        queries: process.env.REACT_APP_QUERIES_URL || 'http://localhost:5000/api/queries',
        admin: process.env.REACT_APP_ADMIN_URL || 'http://localhost:5000/api/admin',
        ai: process.env.REACT_APP_AI_URL || 'http://localhost:5000/api/ai',
    },
};

// Development mode check
export const isDevelopment = APP_CONFIG.environment === 'development';
export const isProduction = APP_CONFIG.environment === 'production';

// API helper functions
export const getApiUrl = (endpoint) => `${APP_CONFIG.api.url}${endpoint}`;
export const getFullUrl = (path) => `${APP_CONFIG.api.baseUrl}${path}`;

// Export individual configs for easier imports
export const { api, socket, endpoints, features, ui, urls } = APP_CONFIG;

export default APP_CONFIG;