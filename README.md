# 🚀 Transforming After-Sales Support

## AI-Powered Customer Service Application

A comprehensive full-stack MERN application that revolutionizes customer support through intelligent AI responses, sentiment analysis, and real-time communication.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green)
![AI Powered](https://img.shields.io/badge/AI-OpenAI%20GPT-blue)
![Real Time](https://img.shields.io/badge/Real%20Time-Socket.io-orange)

## 🌟 Features

### For Customers
- **Instant AI Responses**: Get immediate answers to your queries powered by OpenAI GPT
- **Smart Categorization**: Automatic query categorization (Technical, Billing, General, etc.)
- **Real-time Notifications**: Live updates on query status and responses
- **Sentiment-based Priority**: Urgent queries are automatically prioritized
- **Rating System**: Rate and provide feedback on support quality

### For Administrators
- **Comprehensive Dashboard**: Analytics with charts and performance metrics
- **Query Management**: View, respond to, and manage all customer queries
- **Sentiment Analysis**: Visual insights into customer satisfaction
- **Priority Management**: Handle urgent queries first with automatic prioritization
- **Performance Tracking**: Monitor response times and satisfaction ratings

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Material-UI (MUI)** - Professional, responsive design system
- **Socket.io Client** - Real-time communication
- **React Query** - Efficient data fetching and caching
- **React Hook Form** - Form handling and validation
- **Recharts** - Beautiful analytics charts

### Backend
- **Node.js & Express** - Robust server framework
- **MongoDB & Mongoose** - NoSQL database with ODM
- **Socket.io** - Real-time bidirectional communication
- **OpenAI API** - AI-powered responses and sentiment analysis
- **JWT Authentication** - Secure token-based auth
- **Nodemailer** - Email notifications
- **bcryptjs** - Password hashing

### AI & Analytics
- **OpenAI GPT-3.5** - Natural language processing
- **Sentiment Analysis** - Automatic mood detection
- **Priority Detection** - Smart query prioritization
- **Response Generation** - Context-aware AI responses

## 📁 Project Structure

```
├── frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth, Socket)
│   │   ├── services/        # API service calls
│   │   └── index.js         # App entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Node.js Backend API
│   ├── models/              # MongoDB schemas
│   │   ├── User.js          # User model
│   │   ├── Query.js         # Query model
│   │   └── Notification.js  # Notification model
│   ├── routes/              # API endpoints
│   │   ├── auth.js          # Authentication routes
│   │   ├── queries.js       # Query management
│   │   ├── admin.js         # Admin operations
│   │   └── ai.js            # AI service routes
│   ├── services/            # Business logic
│   │   ├── aiService.js     # OpenAI integration
│   │   └── notificationService.js # Email & notifications
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   └── server.js            # Server entry point
│
├── package.json             # Root package.json
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- OpenAI API Key (optional - app works without AI features)

### Installation

1. **Clone the repository**
```bash
git clone git@github.com:Utkarsh8867/Transforming-After-Sales-Support.git
cd Transforming-After-Sales-Support
```

2. **Install dependencies for both frontend and backend**
```bash
npm run install-deps
```

3. **Set up environment variables**

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-customer-service
JWT_SECRET=your-super-secret-jwt-key-here
OPENAI_API_KEY=your-openai-api-key-here

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

NODE_ENV=development
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_APP_NAME=AI Customer Service
```

4. **Start the application**
```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run server  # Backend only
npm run client  # Frontend only
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Queries
- `GET /api/queries` - Get user queries
- `POST /api/queries` - Create new query
- `GET /api/queries/:id` - Get specific query
- `POST /api/queries/:id/rate` - Rate query response

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/queries` - Get all queries
- `POST /api/admin/queries/:id/respond` - Respond to query
- `PATCH /api/admin/queries/:id/status` - Update query status

### AI Services
- `POST /api/ai/analyze` - Analyze text sentiment
- `POST /api/ai/generate-response` - Generate AI response

## 🎯 Key Features Implementation

### AI-Powered Responses
- Automatic sentiment analysis using OpenAI
- Context-aware response generation
- Priority detection based on sentiment and keywords

### Real-time Communication
- Socket.io integration for live updates
- Instant notifications for query status changes
- Real-time admin dashboard updates

### Smart Analytics
- Customer satisfaction tracking
- Response time monitoring
- Sentiment distribution analysis
- Query category insights

## 🔧 Configuration

### MongoDB Setup
Ensure MongoDB is running locally or update the connection string for MongoDB Atlas.

### OpenAI Integration
Get your API key from [OpenAI Platform](https://platform.openai.com/) and add it to your environment variables.

### Email Notifications
Configure SMTP settings for email notifications (Gmail, Outlook, etc.).

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set up environment variables in your hosting platform
- Ensure MongoDB connection string is updated for production

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting service
- Update API URLs for production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Utkarsh** - Full Stack Developer & AI Integration

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Material-UI team for the excellent component library
- MongoDB team for the robust database solution
- Socket.io team for real-time communication capabilities

---

**Built with ❤️ for transforming customer support experiences**