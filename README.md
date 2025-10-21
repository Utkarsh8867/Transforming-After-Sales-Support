# 🎨 AI-Powered Customer Service Frontend

## React Application with Material-UI and Real-Time Features

A modern, responsive React frontend for the AI-powered customer service application, featuring real-time communication, intelligent dashboards, and seamless user experience.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![TypeScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Features

### 👥 **Customer Experience**
- **Intuitive Dashboard** - Clean, modern interface for query management
- **Smart Query Creation** - AI-powered form with category suggestions
- **Real-Time Updates** - Live notifications for query status changes
- **Response Rating** - Feedback system for service quality
- **Query History** - Complete history with search and filtering
- **Profile Management** - User preferences and notification settings

### 🛡️ **Admin Experience**
- **Comprehensive Dashboard** - Analytics with interactive charts
- **Query Management** - Advanced filtering and bulk operations
- **Real-Time Monitoring** - Live query updates and notifications
- **Response Tools** - Quick response templates and AI suggestions
- **Performance Analytics** - Response times, satisfaction metrics
- **User Management** - Customer insights and interaction history

### 🎯 **Smart Features**
- **AI Integration** - Intelligent response suggestions
- **Sentiment Visualization** - Color-coded sentiment indicators
- **Priority Management** - Visual priority levels and sorting
- **Search & Filter** - Advanced query filtering and search
- **Responsive Design** - Mobile-first, works on all devices
- **Dark/Light Theme** - User preference theme switching

### 🔄 **Real-Time Communication**
- **Socket.io Integration** - Live updates without page refresh
- **Push Notifications** - Browser notifications for important updates
- **Live Status Updates** - Real-time query status changes
- **Admin Notifications** - Instant alerts for new queries

## 🛠️ Tech Stack

- **Framework**: React 18 with Hooks and Context API
- **UI Library**: Material-UI (MUI) v5 with custom theming
- **State Management**: React Query for server state, Context for global state
- **Real-Time**: Socket.io Client for live communication
- **Forms**: React Hook Form with validation
- **Charts**: Recharts for analytics visualization
- **Notifications**: React Hot Toast for user feedback
- **Routing**: React Router v6 with protected routes
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Create React App with modern tooling

## 📁 Project Structure

```
frontend/
├── public/                    # Static Assets
│   ├── index.html            # Main HTML template
│   ├── manifest.json         # PWA manifest
│   └── favicon.ico           # App icon
├── src/
│   ├── components/           # Reusable Components
│   │   ├── Common/          # Shared components
│   │   │   └── LoadingSpinner.js
│   │   └── Layout/          # Layout components
│   │       └── Layout.js    # Main app layout
│   ├── contexts/            # React Contexts
│   │   ├── AuthContext.js   # Authentication state
│   │   └── SocketContext.js # Real-time communication
│   ├── pages/               # Page Components
│   │   ├── Auth/           # Authentication pages
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/      # Dashboard pages
│   │   │   └── Dashboard.js
│   │   ├── Queries/        # Query management
│   │   │   ├── Queries.js
│   │   │   ├── QueryDetail.js
│   │   │   └── CreateQuery.js
│   │   ├── Admin/          # Admin pages
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminQueries.js
│   │   └── Profile/        # User profile
│   │       └── Profile.js
│   ├── services/           # API Services
│   │   └── api.js         # API client and endpoints
│   ├── config/            # Configuration
│   │   └── config.js      # Environment configuration
│   ├── App.js             # Main app component
│   └── index.js           # App entry point
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Backend API running (see backend repository)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/prasadkambale181-cmd/Transforming-After-Sales-Support-frontend.git
cd Transforming-After-Sales-Support-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your backend API URLs
```

4. **Start the development server**
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Application Configuration
REACT_APP_APP_NAME=AI Customer Service
REACT_APP_VERSION=1.0.0

# Backend API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_VERSION=v1

# Socket.io Configuration
REACT_APP_SOCKET_URL=http://localhost:5000

# API Endpoints
REACT_APP_AUTH_ENDPOINT=/auth
REACT_APP_QUERIES_ENDPOINT=/queries
REACT_APP_ADMIN_ENDPOINT=/admin
REACT_APP_AI_ENDPOINT=/ai

# Environment
REACT_APP_NODE_ENV=development

# Feature Flags
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_EMAIL_NOTIFICATIONS=true
REACT_APP_ENABLE_REAL_TIME=true

# UI Configuration
REACT_APP_DEFAULT_THEME=light
REACT_APP_ITEMS_PER_PAGE=10
```

## 🎨 UI Components & Features

### 🔐 Authentication System
- **Login/Register Forms** - Clean, validated forms with error handling
- **JWT Token Management** - Automatic token refresh and storage
- **Protected Routes** - Role-based route protection
- **User Context** - Global authentication state management

### 📊 Dashboard Components
- **Customer Dashboard** - Query overview with quick actions
- **Admin Dashboard** - Comprehensive analytics with charts
- **Statistics Cards** - Key metrics display
- **Interactive Charts** - Recharts integration for data visualization

### 📝 Query Management
- **Query List** - Paginated, filterable query display
- **Query Detail** - Comprehensive query view with responses
- **Create Query** - Smart form with AI-powered categorization
- **Status Tracking** - Visual status indicators and progress

### 🎯 Advanced Features
- **Real-Time Notifications** - Toast notifications for updates
- **Search & Filter** - Advanced filtering with multiple criteria
- **Responsive Design** - Mobile-first approach with breakpoints
- **Loading States** - Skeleton loading and spinners
- **Error Handling** - Graceful error display and recovery

## 🔄 State Management

### React Query Integration
```javascript
// Query data fetching with caching
const { data, isLoading, error } = useQuery(
  'queries',
  () => queriesAPI.getQueries(),
  {
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
);
```

### Context API Usage
```javascript
// Authentication context
const { user, login, logout } = useAuth();

// Socket context for real-time features
const { socket, connected } = useSocket();
```

## 🎨 Material-UI Theming

### Custom Theme Configuration
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
```

### Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Breakpoints** - Material-UI responsive breakpoints
- **Flexible Layouts** - Grid system and flexbox
- **Touch-Friendly** - Large touch targets and gestures

## 🔄 Real-Time Features

### Socket.io Integration
```javascript
// Real-time query updates
socket.on('query-updated', (query) => {
  // Update UI with new query data
  queryClient.invalidateQueries('queries');
  toast.success('Query updated!');
});

// Live notifications
socket.on('notification', (notification) => {
  toast(notification.message, {
    icon: getNotificationIcon(notification.type),
  });
});
```

## 📊 Analytics & Charts

### Recharts Integration
- **Bar Charts** - Query statistics and trends
- **Pie Charts** - Status and sentiment distribution
- **Line Charts** - Performance metrics over time
- **Responsive Charts** - Auto-sizing for different screen sizes

### Dashboard Metrics
- **Query Statistics** - Total, open, resolved counts
- **Response Times** - Average response time tracking
- **Satisfaction Ratings** - Customer feedback metrics
- **Sentiment Analysis** - Visual sentiment distribution

## 🛡️ Security Features

### Authentication Security
- **JWT Token Storage** - Secure token management
- **Automatic Logout** - Token expiration handling
- **Route Protection** - Role-based access control
- **API Interceptors** - Automatic token attachment

### Input Validation
- **Form Validation** - React Hook Form with validation rules
- **XSS Protection** - Input sanitization
- **CSRF Protection** - Token-based request validation

## 📱 Progressive Web App (PWA)

### PWA Features
- **Service Worker** - Offline functionality
- **App Manifest** - Install as native app
- **Push Notifications** - Browser notifications
- **Responsive Icons** - Multiple icon sizes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Build & Deployment

### Production Build
```bash
# Create production build
npm run build

# Serve build locally
npm install -g serve
serve -s build
```

### Environment-Specific Builds
```bash
# Development build
REACT_APP_NODE_ENV=development npm run build

# Production build
REACT_APP_NODE_ENV=production npm run build
```

### Deployment Options
- **Netlify** - Automatic deployments from Git
- **Vercel** - Zero-config deployments
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free hosting for public repos

## 📝 Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App
npm run analyze    # Analyze bundle size
```

## 🎯 Performance Optimization

### Code Splitting
- **Route-based splitting** - Lazy loading for pages
- **Component splitting** - Dynamic imports for large components
- **Bundle analysis** - Webpack bundle analyzer

### Optimization Techniques
- **React.memo** - Component memoization
- **useMemo/useCallback** - Hook optimization
- **Image optimization** - Lazy loading and compression
- **API caching** - React Query caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **UtkarshK** - Frontend Developer & UI/UX Designer

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the amazing framework
- Socket.io team for real-time communication
- Recharts team for beautiful charts
- Create React App team for the build tooling

---

**Built with ❤️ for exceptional user experiences**