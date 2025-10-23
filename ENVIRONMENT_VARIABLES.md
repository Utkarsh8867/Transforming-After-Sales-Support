# Frontend Environment Variables Documentation

## Overview
This document lists all environment variables actually used in the AI Customer Service frontend application. All unused variables have been removed to keep the configuration clean and maintainable.

## Used Environment Variables

### Application Information
These variables are used in `src/config/config.js` for application metadata:

- `REACT_APP_APP_NAME` - Application name displayed in the UI
- `REACT_APP_VERSION` - Application version for tracking
- `REACT_APP_NODE_ENV` - Environment mode (development/production)

### Backend API Configuration
These variables are used in `src/services/api.js` and `src/config/config.js` for API communication:

- `REACT_APP_API_BASE_URL` - Base URL of the backend server
- `REACT_APP_API_URL` - Full API URL with /api path
- `REACT_APP_API_VERSION` - API version for future compatibility

### Socket.io Configuration
Used in `src/contexts/SocketContext.js` for real-time communication:

- `REACT_APP_SOCKET_URL` - Socket.io server URL

### API Endpoints
Used in `src/services/api.js` and `src/config/config.js` for endpoint configuration:

- `REACT_APP_AUTH_ENDPOINT` - Authentication endpoint path
- `REACT_APP_QUERIES_ENDPOINT` - Queries endpoint path
- `REACT_APP_ADMIN_ENDPOINT` - Admin endpoint path
- `REACT_APP_AI_ENDPOINT` - AI features endpoint path

### Full API URLs
Used in `src/config/config.js` for convenience URLs:

- `REACT_APP_LOGIN_URL` - Complete login URL
- `REACT_APP_REGISTER_URL` - Complete registration URL
- `REACT_APP_QUERIES_URL` - Complete queries URL
- `REACT_APP_ADMIN_URL` - Complete admin URL
- `REACT_APP_AI_URL` - Complete AI features URL

### Feature Flags
Used in `src/config/config.js` to enable/disable features:

- `REACT_APP_ENABLE_AI_FEATURES` - Enable AI-powered responses
- `REACT_APP_ENABLE_EMAIL_NOTIFICATIONS` - Enable email notifications
- `REACT_APP_ENABLE_REAL_TIME` - Enable real-time features

### UI Configuration
Used in `src/config/config.js` for UI settings:

- `REACT_APP_DEFAULT_THEME` - Default theme (light/dark)
- `REACT_APP_ITEMS_PER_PAGE` - Default pagination size

### Build Configuration
Used in build process and package.json:

- `GENERATE_SOURCEMAP` - Control source map generation
- `CI` - Disable CI-specific warnings during build

## File Locations

### Where Variables Are Used:

1. **`src/config/config.js`** - Main configuration file that imports most environment variables
2. **`src/services/api.js`** - API service configuration
3. **`src/contexts/SocketContext.js`** - Socket.io connection setup
4. **`package.json`** - Build script configuration

### Configuration Files:

1. **`.env`** - Production environment variables
2. **`.env.example`** - Template for environment variables

## Removed Variables

The following categories of variables were removed as they are not used in the current codebase:

- Authentication storage keys (hardcoded in application)
- UI colors (defined in Material-UI theme)
- Layout dimensions (handled by responsive design)
- Query management limits (handled in backend)
- File upload configuration (not implemented)
- Notification settings (using default toast settings)
- Performance settings (using defaults)
- Analytics IDs (not implemented)
- Social media links (not used in current UI)
- SEO metadata (defined in HTML)
- PWA configuration (using defaults)
- Development flags (not needed)
- Localization settings (not implemented)
- Security settings (handled by backend)
- Error handling (using defaults)
- Advanced features (not implemented)
- Integration keys (not used)
- Experimental features (not implemented)
- Deployment metadata (not used in runtime)

## Benefits of Cleanup

1. **Reduced Complexity** - Easier to understand what variables are actually needed
2. **Better Maintainability** - Less configuration to manage and update
3. **Clearer Dependencies** - Obvious which features depend on which variables
4. **Faster Builds** - Fewer variables to process during build
5. **Reduced Errors** - Less chance of misconfiguration
6. **Better Documentation** - Clear understanding of what each variable does

## Adding New Variables

When adding new environment variables:

1. Add to both `.env` and `.env.example`
2. Use the variable in your code
3. Document it in this file
4. Follow the `REACT_APP_` prefix convention
5. Use descriptive names that indicate purpose

## Environment Setup

### Development:
```bash
cp .env.example .env
# Edit .env with your local backend URL
```

### Production:
Set these variables in your deployment platform (Render, Netlify, etc.)

## Validation

All environment variables have fallback defaults in the code, so the application will work even if some variables are missing. However, for proper functionality, ensure all API URLs point to your actual backend deployment.