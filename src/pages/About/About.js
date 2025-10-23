import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
} from '@mui/material';
import {
    Psychology,
    Speed,
    Security,
    Analytics,
    Support,
    CloudDone,
    SmartToy,
    Dashboard,
    CheckCircle,
    TrendingUp,
    Group,
    Code,
} from '@mui/icons-material';
import Logo from '../../components/Common/Logo';
import '../../styles/dashboard.css';

const About = () => {
    const features = [
        {
            icon: <SmartToy color="primary" />,
            title: 'AI-Powered Responses',
            description: 'Advanced OpenAI GPT integration provides intelligent, context-aware responses to customer queries instantly.'
        },
        {
            icon: <Psychology color="secondary" />,
            title: 'Sentiment Analysis',
            description: 'Automatic mood detection analyzes customer emotions to prioritize urgent queries and improve response quality.'
        },
        {
            icon: <Speed color="success" />,
            title: 'Real-Time Communication',
            description: 'Socket.io integration enables live updates, instant notifications, and seamless real-time interaction.'
        },
        {
            icon: <Analytics color="info" />,
            title: 'Comprehensive Analytics',
            description: 'Detailed dashboards with performance metrics, response times, and customer satisfaction insights.'
        },
        {
            icon: <Security color="warning" />,
            title: 'Enterprise Security',
            description: 'JWT authentication, password encryption, rate limiting, and comprehensive security measures.'
        },
        {
            icon: <CloudDone color="primary" />,
            title: 'Cloud-Ready Deployment',
            description: 'Optimized for modern cloud platforms with scalable architecture and production-ready configuration.'
        }
    ];

    const techStack = [
        { category: 'Frontend', technologies: ['React 18', 'Material-UI', 'Socket.io Client', 'React Query', 'React Router'] },
        { category: 'Backend', technologies: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT Authentication'] },
        { category: 'AI/ML', technologies: ['OpenAI GPT-3.5', 'Sentiment Analysis', 'Natural Language Processing'] },
        { category: 'Security', technologies: ['bcrypt', 'Helmet.js', 'Rate Limiting', 'CORS', 'Input Validation'] },
        { category: 'Deployment', technologies: ['Render.com', 'MongoDB Atlas', 'Docker', 'CI/CD Ready'] }
    ];

    const workflowSteps = [
        {
            step: 1,
            title: 'Customer Submits Query',
            description: 'Customer creates a support query through the intuitive web interface with automatic categorization.'
        },
        {
            step: 2,
            title: 'AI Analysis & Response',
            description: 'OpenAI GPT analyzes the query, detects sentiment, assigns priority, and generates an intelligent response.'
        },
        {
            step: 3,
            title: 'Real-Time Notification',
            description: 'Customer receives instant notification with AI response via Socket.io real-time communication.'
        },
        {
            step: 4,
            title: 'Admin Review & Enhancement',
            description: 'Support team reviews queries, can add human responses, and manages query lifecycle through admin dashboard.'
        },
        {
            step: 5,
            title: 'Feedback & Analytics',
            description: 'Customer rates the service, providing feedback that feeds into comprehensive analytics and reporting.'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header Section */}
            <Box textAlign="center" mb={6}>
                <Box sx={{ mb: 3 }}>
                    <Logo size="large" variant="default" />
                </Box>
                <Typography variant="h2" component="h1" gutterBottom color="primary" className="dashboard-title">
                    AI-Powered Customer Service
                </Typography>
                <Typography variant="h5" color="text.secondary" mb={3}>
                    Transforming Customer Support with Artificial Intelligence
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
                    A comprehensive full-stack application that revolutionizes customer support through intelligent
                    AI responses, real-time communication, and advanced analytics. Built with modern technologies
                    for scalable, secure, and efficient customer service management.
                </Typography>
            </Box>

            {/* Key Features */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    Key Features
                </Typography>
                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        {feature.icon}
                                        <Typography variant="h6" ml={2}>
                                            {feature.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* How It Works */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    How It Works
                </Typography>
                <Grid container spacing={3}>
                    {workflowSteps.map((step, index) => (
                        <Grid item xs={12} key={index}>
                            <Paper sx={{ p: 3, mb: 2 }}>
                                <Box display="flex" alignItems="flex-start" gap={3}>
                                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                                        {step.step}
                                    </Avatar>
                                    <Box flex={1}>
                                        <Typography variant="h6" gutterBottom>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {step.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Technology Stack */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    Technology Stack
                </Typography>
                <Grid container spacing={3}>
                    {techStack.map((category, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        {category.category}
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {category.technologies.map((tech, techIndex) => (
                                            <Chip
                                                key={techIndex}
                                                label={tech}
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Application Benefits */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    Application Benefits
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Group color="primary" />
                                    <Typography variant="h6" ml={2}>
                                        For Customers
                                    </Typography>
                                </Box>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Instant AI-powered responses 24/7" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Real-time query status updates" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Intuitive and user-friendly interface" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Comprehensive query history and tracking" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Feedback and rating system" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Support color="primary" />
                                    <Typography variant="h6" ml={2}>
                                        For Support Teams
                                    </Typography>
                                </Box>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Comprehensive admin dashboard with analytics" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Automated query prioritization and routing" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Performance metrics and reporting" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Real-time monitoring and notifications" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CheckCircle color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary="Sentiment analysis for better customer understanding" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Architecture Overview */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    System Architecture
                </Typography>
                <Paper sx={{ p: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Dashboard sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Frontend (React)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Modern React 18 application with Material-UI components, real-time Socket.io integration,
                                    and responsive design for optimal user experience.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Code sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Backend (Node.js)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Robust Express.js API server with MongoDB integration, JWT authentication,
                                    OpenAI API integration, and comprehensive security measures.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <SmartToy sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    AI Engine (OpenAI)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Advanced GPT-3.5 integration for intelligent response generation,
                                    sentiment analysis, and natural language processing capabilities.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* Performance & Security */}
            <Box mb={6}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" mb={4}>
                    Performance & Security
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <TrendingUp color="success" />
                                    <Typography variant="h6" ml={2}>
                                        Performance Features
                                    </Typography>
                                </Box>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="• Real-time communication with Socket.io" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Optimized database queries with MongoDB indexing" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Efficient caching with React Query" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Code splitting and lazy loading" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Progressive Web App (PWA) capabilities" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Security color="error" />
                                    <Typography variant="h6" ml={2}>
                                        Security Measures
                                    </Typography>
                                </Box>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="• JWT token-based authentication" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• bcrypt password hashing" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Rate limiting and DDoS protection" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• Input validation and sanitization" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="• HTTPS enforcement and security headers" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Divider sx={{ my: 4 }} />
            <Box textAlign="center">
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Built with modern technologies for scalable, secure, and intelligent customer service
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    © 2025 AI-Powered Customer Service Application. Transforming support experiences with artificial intelligence.
                </Typography>
            </Box>
        </Container>
    );
};

export default About;