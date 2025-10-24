# Netlify Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Automatic Deploy (Recommended)
1. **Connect GitHub Repository** to Netlify
2. **Build Settings** will be auto-detected from `netlify.toml`
3. **Deploy** automatically

### Option 2: Manual Configuration
If auto-detection fails, use these settings:

**Build Settings:**
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `build`
- **Node Version:** `18.17.0` (set in .nvmrc)

### Option 3: Custom Build Script
**Build Command:** `npm run build:netlify`

## 🔧 Environment Variables

Netlify will automatically use variables from `netlify.toml`, but you can also set them manually:

### Required Variables:
```env
NODE_VERSION=18.17.0
CI=false
GENERATE_SOURCEMAP=false
NODE_OPTIONS=--max-old-space-size=4096

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

## 🐛 Troubleshooting

### Common Issues & Solutions:

#### 1. **Node Version Issues**
```bash
# Error: Node version not supported
# Solution: Updated .nvmrc to use Node 18.17.0
```

#### 2. **Dependency Installation Fails**
```bash
# Try alternative build commands:
npm install --legacy-peer-deps && npm run build
npm install --force && npm run build
```

#### 3. **react-scripts Not Found**
```bash
# Use the safe build script:
npm run build:safe
```

#### 4. **Memory Issues**
```bash
# Already handled in netlify.toml:
NODE_OPTIONS=--max-old-space-size=4096
```

### Manual Build Test:
```bash
# Test locally before deploying:
npm ci
npm run build
# Should create 'build' directory
```

## 📁 File Structure

The following files configure Netlify deployment:

- `netlify.toml` - Main Netlify configuration
- `.nvmrc` - Node.js version specification
- `netlify-build.js` - Custom build script
- `package.json` - Build scripts and dependencies

## 🔄 Alternative Deployment Methods

### Drag & Drop Deploy:
1. Run `npm run build` locally
2. Drag the `build` folder to Netlify dashboard
3. Instant deployment

### CLI Deploy:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

## ✅ Expected Result

After successful deployment:
- ✅ Frontend accessible at Netlify URL
- ✅ Connected to backend APIs
- ✅ All routes work (SPA routing configured)
- ✅ Static assets cached properly
- ✅ Security headers applied

## 🔗 Useful Links

- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [Node.js Version Management](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## 🆘 If Deployment Still Fails

1. **Check Build Logs** in Netlify dashboard
2. **Try Manual Deploy** with build folder
3. **Contact Support** with specific error messages
4. **Alternative:** Deploy to Vercel or GitHub Pages