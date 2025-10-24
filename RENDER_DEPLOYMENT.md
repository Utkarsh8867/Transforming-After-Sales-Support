# Render.com Deployment Guide

## 🚨 Current Issue: react-scripts not found

### Quick Fix Options:

#### **Option 1: Use Custom Build Script (Recommended)**
In Render Dashboard → Settings → Build Command:
```bash
npm ci && node render-build.js
```

#### **Option 2: Force Install Dependencies**
In Render Dashboard → Settings → Build Command:
```bash
npm ci && npm install react-scripts@5.0.1 && npm run build
```

#### **Option 3: Use Safe Build Script**
In Render Dashboard → Settings → Build Command:
```bash
npm ci && npm run build:safe
```

#### **Option 4: Alternative Build Process**
In Render Dashboard → Settings → Build Command:
```bash
npm install --force && npm run build
```

## 🔧 Environment Variables Required:

Set these in Render Dashboard → Environment:

```env
NODE_VERSION=20.11.0
NODE_OPTIONS=--max-old-space-size=4096
CI=false
GENERATE_SOURCEMAP=false
NPM_CONFIG_PRODUCTION=false

# Backend URLs
REACT_APP_API_BASE_URL=https://transforming-after-sales-support-backend.onrender.com
REACT_APP_API_URL=https://transforming-after-sales-support-backend.onrender.com/api
REACT_APP_SOCKET_URL=https://transforming-after-sales-support-backend.onrender.com

# App Configuration
REACT_APP_APP_NAME=AI Customer Service
REACT_APP_VERSION=1.0.0
REACT_APP_NODE_ENV=production

# API Endpoints
REACT_APP_AUTH_ENDPOINT=/auth
REACT_APP_QUERIES_ENDPOINT=/queries
REACT_APP_ADMIN_ENDPOINT=/admin
REACT_APP_AI_ENDPOINT=/ai

# Feature Flags
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_EMAIL_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true

# UI Configuration
REACT_APP_DEFAULT_THEME=light
REACT_APP_ITEMS_PER_PAGE=10
```

## 📁 Deployment Settings:

- **Service Type:** Static Site
- **Build Command:** See options above
- **Publish Directory:** `build`
- **Node Version:** 20.11.0 (from .nvmrc)
- **Auto-Deploy:** Yes
- **Branch:** main

## 🐛 Troubleshooting:

### If build still fails:

1. **Clear Build Cache:**
   - Go to Render Dashboard
   - Settings → Clear Build Cache
   - Trigger new deployment

2. **Check Logs:**
   - Look for specific error messages
   - Verify all environment variables are set

3. **Alternative Repository Setup:**
   - Ensure repository is public or Render has access
   - Check that all files are committed and pushed

4. **Manual Deployment Test:**
   ```bash
   # Test locally first
   npm ci
   npm run build:safe
   ```

## ✅ Expected Result:

After successful deployment:
- Frontend accessible at your Render URL
- Connected to backend APIs
- All features working (auth, queries, admin, etc.)
- Real-time Socket.io connection active

## 🔄 If All Else Fails:

Contact Render support or try deploying to:
- Netlify (drag & drop build folder)
- Vercel (GitHub integration)
- GitHub Pages (static hosting)

The issue is specifically with Render's dependency installation process, not with the application code itself.