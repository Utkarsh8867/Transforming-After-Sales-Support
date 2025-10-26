# 🌐 CORS Configuration Guide

## 🔧 **Current CORS Setup**

The backend is configured to accept requests from multiple frontend origins with flexible pattern matching.

### ✅ **Allowed Origins**

#### **Development Origins:**
- `http://localhost:3000` - Default React development server
- `http://localhost:3001` - Alternative development port
- `https://localhost:3000` - HTTPS development (with SSL)
- `https://localhost:3001` - HTTPS development alternative

#### **Production Deployment Patterns:**
- **Render.com**: `https://*.onrender.com`
- **Netlify**: `https://*.netlify.app`
- **Vercel**: `https://*.vercel.app`
- **GitHub Pages**: `https://*.github.io`
- **Heroku**: `https://*.herokuapp.com`
- **Railway**: `https://*.railway.app`
- **Surge.sh**: `https://*.surge.sh`

#### **Custom Domains:**
- Environment variable: `FRONTEND_URL`
- Additional URLs: `ADDITIONAL_FRONTEND_URLS` (comma-separated)

### 🔐 **CORS Configuration Details**

```javascript
const corsOptions = {
    origin: function (origin, callback) {
        // Allows requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Pattern matching for deployment platforms
        // String matching for specific URLs
        // Environment variable support
    },
    credentials: true,                    // Allow cookies and auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count']     // Headers accessible to frontend
};
```

## ⚙️ **Environment Variables**

### **Required:**
```env
FRONTEND_URL=http://localhost:3000
```

### **Optional (for multiple deployments):**
```env
ADDITIONAL_FRONTEND_URLS=https://app.onrender.com,https://app.netlify.app,https://app.vercel.app
```

## 🚀 **Deployment-Specific Setup**

### **For Render.com Frontend:**
```env
FRONTEND_URL=https://your-app-name.onrender.com
```

### **For Netlify Frontend:**
```env
FRONTEND_URL=https://your-app-name.netlify.app
```

### **For Vercel Frontend:**
```env
FRONTEND_URL=https://your-app-name.vercel.app
```

### **For Custom Domain:**
```env
FRONTEND_URL=https://yourdomain.com
```

### **For Multiple Deployments:**
```env
FRONTEND_URL=https://production.yourdomain.com
ADDITIONAL_FRONTEND_URLS=https://staging.yourdomain.com,https://dev-app.onrender.com,https://preview-app.netlify.app
```

## 🔍 **Testing CORS Configuration**

### **1. Browser Console Test:**
```javascript
// Test from browser console on your frontend
fetch('https://your-backend.onrender.com/api/health')
  .then(response => response.json())
  .then(data => console.log('CORS working:', data))
  .catch(error => console.error('CORS error:', error));
```

### **2. cURL Test:**
```bash
# Test preflight request
curl -H "Origin: https://your-frontend.onrender.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/auth/login

# Test actual request
curl -H "Origin: https://your-frontend.onrender.com" \
     -H "Content-Type: application/json" \
     -X POST \
     https://your-backend.onrender.com/api/health
```

### **3. Frontend API Test:**
```javascript
// In your React app
import axios from 'axios';

const testCORS = async () => {
  try {
    const response = await axios.get('/api/health');
    console.log('CORS working:', response.data);
  } catch (error) {
    console.error('CORS error:', error);
  }
};
```

## 🐛 **Troubleshooting CORS Issues**

### **Common Error Messages:**

#### **"Access to fetch at '...' from origin '...' has been blocked by CORS policy"**
**Solution:** Add your frontend URL to the allowed origins

#### **"Request header field authorization is not allowed by Access-Control-Allow-Headers"**
**Solution:** Already fixed - Authorization header is in allowedHeaders

#### **"Method PUT is not allowed by Access-Control-Allow-Methods"**
**Solution:** Already fixed - All methods are allowed

### **Debug Steps:**

1. **Check Backend Logs:**
   - Look for "CORS blocked origin:" messages
   - Verify the origin being sent by frontend

2. **Verify Environment Variables:**
   ```bash
   echo $FRONTEND_URL
   echo $ADDITIONAL_FRONTEND_URLS
   ```

3. **Test with Postman:**
   - Add `Origin` header with your frontend URL
   - Check if request succeeds

4. **Browser Network Tab:**
   - Look for OPTIONS preflight requests
   - Check response headers for CORS headers

## 🔧 **Dynamic CORS Configuration**

The backend automatically allows:
- ✅ All localhost origins (development)
- ✅ All major deployment platform patterns
- ✅ Custom domains via environment variables
- ✅ Multiple frontend deployments
- ✅ Mobile app requests (no origin)

## 🛡️ **Security Considerations**

### **Production Recommendations:**
1. **Specify exact domains** instead of wildcards when possible
2. **Use HTTPS** for all production origins
3. **Regularly review** allowed origins
4. **Monitor logs** for blocked requests

### **Current Security Features:**
- ✅ Credentials support for authenticated requests
- ✅ Specific header allowlist
- ✅ Method restrictions
- ✅ Origin validation with logging
- ✅ No wildcard (*) origins in production

## 📊 **CORS Headers Sent by Backend**

```
Access-Control-Allow-Origin: https://your-frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Total-Count
```

## 🎯 **Quick Setup for New Frontend**

1. **Add your frontend URL to environment:**
   ```env
   FRONTEND_URL=https://your-new-frontend.com
   ```

2. **Or add to additional URLs:**
   ```env
   ADDITIONAL_FRONTEND_URLS=https://existing.com,https://your-new-frontend.com
   ```

3. **Restart backend service**

4. **Test connection from frontend**

Your backend now supports CORS for all major deployment platforms and custom domains! 🚀