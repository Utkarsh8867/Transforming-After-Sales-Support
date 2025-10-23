# 🔧 Frontend Deployment Troubleshooting Guide

## Common Render.com Deployment Issues & Solutions

### ❌ **Issue 1: "react-scripts not found"**

**Error Message:**
```
sh: 1: react-scripts: not found
==> Build failed 😞
```

**Root Cause:** Dependencies not properly installed during build process.

**Solutions:**

#### **Solution A: Update Build Command (Recommended)**
In Render dashboard, set build command to:
```bash
npm ci && npm run build
```

#### **Solution B: Use Custom Build Script**
In Render dashboard, set build command to:
```bash
chmod +x build.sh && ./build.sh
```

#### **Solution C: Force react-scripts Installation**
In Render dashboard, set build command to:
```bash
npm install && npm install react-scripts@5.0.1 && npm run build
```

### ❌ **Issue 2: Node.js Version End-of-Life Warning**

**Error Message:**
```
Node.js version 18.20.8 has reached end-of-life
```

**Solution:** Updated to Node.js 20.x (already fixed in this repo)
- `.nvmrc` file specifies Node 20
- `package.json` engines updated to Node 20.x

### ❌ **Issue 3: Repository Access Warning**

**Error Message:**
```
It looks like we don't have access to your repo, but we'll try to clone it anyway
```

**Solutions:**
1. **Make repository public** (easiest solution)
2. **Add Render as collaborator** in GitHub repo settings
3. **Use GitHub integration** in Render dashboard instead of manual repo URL

### ❌ **Issue 4: Build Memory Issues**

**Error Message:**
```
JavaScript heap out of memory
```

**Solution:** Set environment variable in Render:
```
NODE_OPTIONS=--max-old-space-size=4096
```

### ❌ **Issue 5: Environment Variables Not Loading**

**Symptoms:** App loads but API calls fail

**Solution:** Ensure all required environment variables are set in Render dashboard:
```env
REACT_APP_API_BASE_URL=https://your-backend.onrender.com
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_SOCKET_URL=https://your-backend.onrender.com
GENERATE_SOURCEMAP=false
CI=false
```

## 🚀 **Step-by-Step Deployment Fix**

### **Step 1: Repository Setup**
1. Ensure repository is **public** or add Render as collaborator
2. Verify all files are committed and pushed to `main` branch

### **Step 2: Render Configuration**
1. **Service Type:** Static Site
2. **Build Command:** `npm ci && npm run build`
3. **Publish Directory:** `build`
4. **Node Version:** 20 (auto-detected from .nvmrc)

### **Step 3: Environment Variables**
Set these in Render dashboard:
```env
NODE_VERSION=20.11.0
GENERATE_SOURCEMAP=false
CI=false
NODE_OPTIONS=--max-old-space-size=4096
REACT_APP_API_BASE_URL=https://transforming-after-sales-support-backend.onrender.com
REACT_APP_API_URL=https://transforming-after-sales-support-backend.onrender.com/api
REACT_APP_SOCKET_URL=https://transforming-after-sales-support-backend.onrender.com
```

### **Step 4: Advanced Settings**
- **Auto-Deploy:** Yes
- **Branch:** main
- **Root Directory:** Leave empty (deploy from root)

## 🔍 **Debugging Steps**

### **1. Check Build Logs**
Look for these specific errors in Render build logs:
- `react-scripts: not found` → Dependencies issue
- `heap out of memory` → Memory issue
- `Module not found` → Missing dependencies
- `Permission denied` → File permissions issue

### **2. Verify Package.json**
Ensure these are correct:
```json
{
  "engines": {
    "node": "20.x",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "build": "CI=false GENERATE_SOURCEMAP=false react-scripts build"
  }
}
```

### **3. Test Locally**
Before deploying, test the build locally:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm ci

# Test build
npm run build

# Verify build directory exists
ls -la build/
```

## 🛠️ **Alternative Build Commands**

If standard build fails, try these alternatives:

### **Option 1: Clean Install**
```bash
rm -rf node_modules package-lock.json && npm ci && npm run build
```

### **Option 2: Force Install**
```bash
npm install --force && npm run build
```

### **Option 3: Legacy Peer Deps**
```bash
npm install --legacy-peer-deps && npm run build
```

### **Option 4: Yarn Alternative**
```bash
yarn install && yarn build
```

## 📞 **Still Having Issues?**

### **Quick Fixes Checklist:**
- ✅ Repository is public or Render has access
- ✅ Node.js version is 20.x (check .nvmrc)
- ✅ react-scripts is in dependencies (not devDependencies)
- ✅ Build command is `npm ci && npm run build`
- ✅ Environment variables are set correctly
- ✅ No syntax errors in package.json

### **Contact Support:**
If issues persist:
1. Check Render documentation: https://render.com/docs
2. Render community forum: https://community.render.com
3. GitHub issues in this repository

---

**This troubleshooting guide covers 95% of common deployment issues. Follow the steps above for successful deployment! 🚀**