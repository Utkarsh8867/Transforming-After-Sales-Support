import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
} from '@mui/material';
import {
    Add,
    QuestionAnswer,
    TrendingUp,
    Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { queriesAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner.jsx';
import Logo from '../../components/Common/Logo.jsx';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: queriesData, isLoading } = useQuery(
        'dashboard-queries',
        () => queriesAPI.getQueries({ limit: 5 }),
        {
            refetchInterval: 30000, // Refetch every 30 seconds
        }
    );

    if (isLoading) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    const queries = queriesData?.data?.queries || [];
    const stats = {
        total: queriesData?.data?.pagination?.total || 0,
        open: queries.filter(q => q.status === 'open').length,
        resolved: queries.filter(q => q.status === 'resolved').length,
        inProgress: queries.filter(q => q.status === 'in-progress').length,
    };

    const getStatusColor = (status) => {
        const colors = {
            open: 'warning',
            'in-progress': 'info',
            resolved: 'success',
            closed: 'default',
        };
        return colors[status] || 'default';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'success',
            medium: 'warning',
            high: 'error',
            urgent: 'error',
        };
        return colors[priority] || 'default';
    };

    return (
        <Box>
            <Box mb={4}>
                <Box
                    className="dashboard-header logo-container"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={2}
                    sx={{
                        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                        color: 'white',
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        boxShadow: 3,
                        flexDirection: { xs: 'column', sm: 'row' },
                        textAlign: { xs: 'center', sm: 'left' }
                    }}
                >
                    <Logo size="large" showText={false} variant="white" />
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 1 }}>
                            Welcome back, {user?.name}!
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            AI Customer Service Dashboard
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Here&apos;s an overview of your customer service queries
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        boxShadow: 3,
                        '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.3s' }
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: 'primary.main',
                                        color: 'white'
                                    }}
                                >
                                    <QuestionAnswer />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        {stats.total}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                        Total Queries
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)',
                        boxShadow: 3,
                        '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.3s' }
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: 'warning.main',
                                        color: 'white'
                                    }}
                                >
                                    <Schedule />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.dark' }}>
                                        {stats.open}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                        Open Queries
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #e1f5fe 0%, #81d4fa 100%)',
                        boxShadow: 3,
                        '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.3s' }
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: 'info.main',
                                        color: 'white'
                                    }}
                                >
                                    <TrendingUp />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.dark' }}>
                                        {stats.inProgress}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                        In Progress
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #e8f5e8 0%, #a5d6a7 100%)',
                        boxShadow: 3,
                        '&:hover': { transform: 'translateY(-2px)', transition: 'all 0.3s' }
                    }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: 'success.main',
                                        color: 'white'
                                    }}
                                >
                                    <QuestionAnswer />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                                        {stats.resolved}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                                        Resolved
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <QuestionAnswer />
                                Quick Actions
                            </Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => navigate('/queries/new')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                                        boxShadow: 2,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #0056b3 0%, #004085 100%)',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                >
                                    New Query
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/queries')}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                >
                                    View All Queries
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Queries */}
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <QuestionAnswer />
                            Recent Queries
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => navigate('/queries')}
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            View All
                        </Button>
                    </Box>

                    {queries.length === 0 ? (
                        <Box textAlign="center" py={4}>
                            <Typography variant="body1" color="text.secondary">
                                No queries yet. Create your first query to get started!
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => navigate('/queries/new')}
                                sx={{ mt: 2 }}
                            >
                                Create Query
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            {queries.map((query) => (
                                <Box
                                    key={query._id}
                                    p={2}
                                    border={1}
                                    borderColor="divider"
                                    borderRadius={1}
                                    mb={2}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                    onClick={() => navigate(`/queries/${query._id}`)}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            {query.subject}
                                        </Typography>
                                        <Box display="flex" gap={1}>
                                            <Chip
                                                label={query.status}
                                                color={getStatusColor(query.status)}
                                                size="small"
                                            />
                                            <Chip
                                                label={query.priority}
                                                color={getPriorityColor(query.priority)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {query.message}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" mt={1}>
                                        {new Date(query.createdAt).toLocaleDateString()} • {query.category}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;