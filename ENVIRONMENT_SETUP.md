# 🔧 Environment Configuration Guide

This guide explains how to set up environment variables for both backend and frontend applications.

## 📁 File Structure

```
project-root/
├── backend/
│   ├── .env                 # Backend environment variables (not in git)
│   └── .env.example         # Backend environment template
├── frontend/
│   ├── .env                 # Frontend environment variables (not in git)
│   └── .env.example         # Frontend environment template
└── ENVIRONMENT_SETUP.md    # This file
```

## 🔧 Backend Environment Variables

### File: `backend/.env`

```env
# Server Configuration
PORT=5000                                    # Server port
NODE_ENV=development                         # Environment (development/production)
SERVER_HOST=localhost                        # Server host

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-customer-service
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here    # JWT signing secret
JWT_EXPIRES_IN=7d                           # Token expiration time

# AI Configuration
OPENAI_API_KEY=your-openai-api-key-here     # OpenAI API key

# Frontend Configuration
FRONTEND_URL=http://localhost:3000           # Frontend URL for CORS

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com                    # SMTP host
EMAIL_PORT=587                              # SMTP port
EMAIL_USER=your-email@gmail.com             # Email username
EMAIL_PASS=your-app-password                # Email password/app password

# API Configuration
API_VERSION=v1                              # API version
RATE_LIMIT_WINDOW_MS=900000                 # Rate limit window (15 minutes)
RATE_LIMIT_MAX_REQUESTS=100                 # Max requests per window
```

### Backend Environment Variables Explanation

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |
| `EMAIL_HOST` | SMTP server host | No | - |
| `EMAIL_USER` | Email username | No | - |
| `EMAIL_PASS` | Email password | No | - |

## 🎨 Frontend Environment Variables

### File: `frontend/.env`

```env
# Application Configuration
REACT_APP_APP_NAME=AI Customer Service       # Application name
REACT_APP_VERSION=1.0.0                     # Application version

# Backend API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000 # Backend base URL
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
REACT_APP_API_VERSION=v1                     # API version

# Socket.io Configuration
REACT_APP_SOCKET_URL=http://localhost:5000   # Socket.io server URL

# API Endpoints
REACT_APP_AUTH_ENDPOINT=/auth                # Auth endpoint
REACT_APP_QUERIES_ENDPOINT=/queries          # Queries endpoint
REACT_APP_ADMIN_ENDPOINT=/admin              # Admin endpoint
REACT_APP_AI_ENDPOINT=/ai                    # AI endpoint

# Full API Endpoints (for convenience)
REACT_APP_LOGIN_URL=http://localhost:5000/api/auth/login
REACT_APP_REGISTER_URL=http://localhost:5000/api/auth/register
REACT_APP_QUERIES_URL=http://localhost:5000/api/queries
REACT_APP_ADMIN_URL=http://localhost:5000/api/admin
REACT_APP_AI_URL=http://localhost:5000/api/ai

# Environment
REACT_APP_NODE_ENV=development               # Environment mode

# Feature Flags
REACT_APP_ENABLE_AI_FEATURES=true           # Enable AI features
REACT_APP_ENABLE_EMAIL_NOTIFICATIONS=true   # Enable email notifications
REACT_APP_ENABLE_REAL_TIME=true             # Enable real-time features

# UI Configuration
REACT_APP_DEFAULT_THEME=light               # Default theme
REACT_APP_ITEMS_PER_PAGE=10                 # Items per page in lists
```

### Frontend Environment Variables Explanation

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_BASE_URL` | Backend server base URL | No | http://localhost:5000 |
| `REACT_APP_API_URL` | Backend API URL | No | http://localhost:5000/api |
| `REACT_APP_SOCKET_URL` | Socket.io server URL | No | http://localhost:5000 |
| `REACT_APP_ENABLE_AI_FEATURES` | Enable/disable AI features | No | true |
| `REACT_APP_APP_NAME` | Application display name | No | AI Customer Service |

## 🚀 Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Copy environment template
cp .env.example .env

# Edit the .env file with your actual values
# Required: MONGODB_URI, JWT_SECRET
# Optional: OPENAI_API_KEY, EMAIL_* variables
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Copy environment template
cp .env.example .env

# Edit the .env file if needed
# Usually the defaults work for local development
```

### 3. Production Setup

For production deployment, update the URLs:

**Backend `.env`:**
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend `.env`:**
```env
REACT_APP_NODE_ENV=production
REACT_APP_API_BASE_URL=https://your-backend-domain.com
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_SOCKET_URL=https://your-backend-domain.com
```

## 🔐 Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong JWT secrets** in production
3. **Use environment-specific URLs** for different deployments
4. **Rotate API keys** regularly
5. **Use app passwords** for email authentication

## 🛠️ Configuration Usage

### In Backend Code

```javascript
// Access environment variables
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

### In Frontend Code

```javascript
// Import configuration
import { APP_CONFIG } from './config/config';

// Use configuration
const apiUrl = APP_CONFIG.api.url;
const socketUrl = APP_CONFIG.socket.url;
const isAiEnabled = APP_CONFIG.features.aiEnabled;
```

## 🔍 Troubleshooting

### Common Issues

1. **Backend won't start**: Check MongoDB connection string
2. **Frontend can't connect**: Verify API URLs match backend
3. **AI features not working**: Check OpenAI API key
4. **Email not sending**: Verify SMTP credentials
5. **CORS errors**: Ensure FRONTEND_URL matches frontend URL

### Environment Variable Not Loading

1. Restart the development server
2. Check variable name starts with `REACT_APP_` for frontend
3. Verify `.env` file is in correct directory
4. Check for typos in variable names

## 📚 Additional Resources

- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Node.js Environment Variables](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)
- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [OpenAI API Documentation](https://platform.openai.com/docs)