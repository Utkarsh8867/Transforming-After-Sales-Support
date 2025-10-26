# AI-Powered Customer Service Frontend

## 🚀 Overview

A modern React frontend application for AI-powered customer service with enhanced UI, professional branding, and comprehensive deployment configurations.

## ✨ Features

- **Enhanced Dashboard** with improved logo visibility and AI Customer Service branding
- **Modern UI Design** with gradients, animations, and professional styling
- **Responsive Layout** optimized for all devices
- **JSX Components** following React best practices
- **Multiple Deployment Options** (Netlify, Render, Vercel)
- **Real-time Communication** via Socket.io
- **Material-UI Integration** with custom theming

## 🛠️ Tech Stack

- **React 18** with JSX components
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Socket.io Client** for real-time features
- **Axios** for API communication
- **React Hook Form** for form handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- npm 8.0.0 or higher

### Installation
```bash
# Clone the repository
git clone git@github.com:kaut88/TSSF.git
cd TSSF

# Install dependencies
npm install

# Start development server
npm start
```

The app will run at `http://localhost:3000`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run build:safe` | Build with dependency verification |
| `npm run build:netlify` | Custom Netlify build script |
| `npm run build:render` | Custom Render build script |
| `npm test` | Run test suite |

## 🌐 Deployment

### Netlify (Recommended)
- **Automatic:** Uses `netlify.toml` configuration
- **Manual:** Set build command to `npm install --legacy-peer-deps && npm run build`
- **Publish Directory:** `build`

### Render.com
- **Build Command:** `npm ci && node render-build.js`
- **Publish Directory:** `build`
- **Environment:** All variables configured in `render.yaml`

### Vercel
- **Framework:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`

## 🔧 Environment Variables

All environment variables are pre-configured in deployment files:

### Backend Connection
```env
REACT_APP_API_BASE_URL=https://transforming-after-sales-support-backend.onrender.com
REACT_APP_API_URL=https://transforming-after-sales-support-backend.onrender.com/api
REACT_APP_SOCKET_URL=https://transforming-after-sales-support-backend.onrender.com
```

### Feature Flags
```env
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_EMAIL_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Common/          # Reusable components (Logo, LoadingSpinner, etc.)
│   └── Layout/          # Layout components (Header, Sidebar, etc.)
├── pages/
│   ├── Auth/           # Login, Register
│   ├── Dashboard/      # Main dashboard
│   ├── Queries/        # Query management
│   ├── Admin/          # Admin panel
│   └── Profile/        # User profile
├── contexts/           # React contexts (Auth, Socket)
├── services/           # API services
├── styles/             # Custom CSS
└── config/             # Configuration files
```

## 🎨 UI Enhancements

### Dashboard Improvements
- **Enhanced Logo Visibility** with proper sizing and styling
- **Professional Branding** with "AI Customer Service" prominence
- **Gradient Backgrounds** for modern appearance
- **Hover Animations** and smooth transitions
- **Responsive Design** for all screen sizes

### Component Features
- **JSX Extensions** for all React components
- **Material-UI Theming** with custom colors
- **Loading States** with professional spinners
- **Error Handling** with user-friendly messages

## 🔗 API Integration

The frontend connects to the backend API with the following endpoints:

- **Authentication:** `/api/auth/login`, `/api/auth/register`
- **Queries:** `/api/queries` (CRUD operations)
- **Admin:** `/api/admin/dashboard`, `/api/admin/queries`
- **AI Features:** `/api/ai/analyze`, `/api/ai/generate-response`

## 📚 Documentation

- `NETLIFY_DEPLOYMENT.md` - Netlify deployment guide
- `RENDER_DEPLOYMENT.md` - Render deployment guide
- `JSX_CONVERSION.md` - JSX conversion documentation
- `DEPLOYMENT_TROUBLESHOOTING.md` - Common deployment issues

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies not installing:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Build failures:**
   ```bash
   npm run build:safe
   ```

3. **Development server issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🔗 Related Repositories

- Backend: [Transforming After Sales Support Backend](https://github.com/prasadkambale181-cmd/Transforming-After-Sales-Support-backend)

---

**Built with ❤️ using React and Material-UI**