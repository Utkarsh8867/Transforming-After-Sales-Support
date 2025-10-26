# 🚀 AI-Powered Customer Service Backend

## Node.js Express API with AI Integration

A comprehensive backend API for the AI-powered customer service application, featuring intelligent query processing, sentiment analysis, and real-time communication.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

## 🌟 Features

### 🤖 AI-Powered Intelligence
- **OpenAI GPT Integration** - Intelligent response generation
- **Sentiment Analysis** - Automatic mood detection and priority assignment
- **Context-Aware Responses** - Smart query understanding and categorization
- **Priority Detection** - Automatic escalation based on sentiment and keywords

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Customer and Admin role management
- **Password Hashing** - bcrypt encryption for secure password storage
- **Rate Limiting** - API protection against abuse
- **CORS Configuration** - Secure cross-origin resource sharing

### 📊 Query Management
- **Smart Categorization** - Automatic query classification
- **Status Tracking** - Complete query lifecycle management
- **Response Time Monitoring** - Performance analytics
- **Satisfaction Ratings** - Customer feedback system

### 🔄 Real-Time Communication
- **Socket.io Integration** - Live updates and notifications
- **Real-time Dashboard** - Instant admin notifications
- **Live Status Updates** - Customer query status changes
- **Notification System** - Email and in-app notifications

### 📈 Analytics & Reporting
- **Dashboard Metrics** - Comprehensive performance analytics
- **Sentiment Distribution** - Customer mood insights
- **Response Time Analytics** - Performance monitoring
- **Query Statistics** - Detailed reporting system

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **AI/ML**: OpenAI GPT-3.5 API
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Validation**: express-validator

## 📁 Project Structure

```
backend/
├── models/                 # Database Models
│   ├── User.js            # User model with authentication
│   ├── Query.js           # Query model with AI integration
│   └── Notification.js    # Notification system model
├── routes/                # API Routes
│   ├── auth.js           # Authentication endpoints
│   ├── queries.js        # Query management endpoints
│   ├── admin.js          # Admin operations endpoints
│   └── ai.js             # AI service endpoints
├── services/              # Business Logic
│   ├── aiService.js      # OpenAI integration service
│   └── notificationService.js # Email & notification service
├── middleware/            # Custom Middleware
│   └── auth.js           # JWT authentication middleware
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or Atlas)
- OpenAI API Key (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/prasadkambale181-cmd/Transforming-After-Sales-Support-backend.git
cd Transforming-After-Sales-Support-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
SERVER_HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-customer-service

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# AI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# API Configuration
API_VERSION=v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

#### POST `/api/auth/login`
User login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current user (requires authentication)

### Query Management Endpoints

#### GET `/api/queries`
Get user queries (with pagination and filters)

#### POST `/api/queries`
Create a new query
```json
{
  "subject": "Technical Issue",
  "message": "I'm having trouble with...",
  "category": "technical"
}
```

#### GET `/api/queries/:id`
Get specific query details

#### POST `/api/queries/:id/rate`
Rate a query response
```json
{
  "rating": 5,
  "feedback": "Great service!"
}
```

### Admin Endpoints

#### GET `/api/admin/dashboard`
Get admin dashboard statistics

#### GET `/api/admin/queries`
Get all queries with filters

#### POST `/api/admin/queries/:id/respond`
Respond to a customer query
```json
{
  "message": "Thank you for contacting us...",
  "status": "resolved"
}
```

#### PATCH `/api/admin/queries/:id/status`
Update query status
```json
{
  "status": "in-progress",
  "priority": "high"
}
```

### AI Service Endpoints

#### POST `/api/ai/analyze`
Analyze text sentiment
```json
{
  "text": "I'm very frustrated with this service"
}
```

#### POST `/api/ai/generate-response`
Generate AI response
```json
{
  "query": "How do I reset my password?",
  "category": "technical"
}
```

## 🔧 Database Models

### User Model
- Authentication and profile management
- Role-based access control
- Preference settings

### Query Model
- Customer queries with AI analysis
- Sentiment scoring and priority assignment
- Response tracking and satisfaction ratings

### Notification Model
- Multi-channel notification system
- Email and in-app notifications
- Read status tracking

## 🤖 AI Integration

### OpenAI GPT Features
- **Intelligent Response Generation**: Context-aware customer service responses
- **Sentiment Analysis**: Automatic mood detection with confidence scoring
- **Priority Detection**: Smart escalation based on sentiment and keywords
- **Category Classification**: Automatic query categorization

### AI Service Functions
```javascript
// Analyze customer query sentiment
const sentiment = await analyzeQuery(queryText);

// Generate intelligent response
const response = await generateAIResponse(query, category);

// Get admin response suggestions
const suggestions = await generateAdminSuggestions(query);
```

## 📧 Email Integration

### Nodemailer Configuration
- SMTP support for various email providers
- HTML email templates
- Automatic notifications for query updates
- Configurable email preferences

## 🔄 Real-Time Features

### Socket.io Events
- `query-created` - New query notifications
- `query-updated` - Status change notifications
- `notification` - General notifications
- `join-room` - User-specific rooms

## 📊 Analytics & Monitoring

### Dashboard Metrics
- Total queries and daily statistics
- Response time analytics
- Satisfaction ratings
- Sentiment distribution
- Priority breakdown

## 🛡️ Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent API abuse
- **CORS Configuration** for secure cross-origin requests
- **Input Validation** using express-validator
- **Security Headers** with Helmet.js

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use PM2 or similar for process management

### Docker Support
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **UtkarshK** - Backend Developer & AI Integration Specialist

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- MongoDB team for the excellent database solution
- Express.js community for the robust framework
- Socket.io team for real-time communication capabilities

---

**Built with ❤️ for transforming customer support experiences**