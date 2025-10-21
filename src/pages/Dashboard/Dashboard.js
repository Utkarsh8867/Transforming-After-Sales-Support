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
import LoadingSpinner from '../../components/Common/LoadingSpinner';

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
                <Typography variant="h4" gutterBottom>
                    Welcome back, {user?.name}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Here's an overview of your customer service queries
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <QuestionAnswer color="primary" />
                                <Box>
                                    <Typography variant="h4">{stats.total}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Total Queries
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Schedule color="warning" />
                                <Box>
                                    <Typography variant="h4">{stats.open}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Open Queries
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <TrendingUp color="info" />
                                <Box>
                                    <Typography variant="h4">{stats.inProgress}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        In Progress
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <QuestionAnswer color="success" />
                                <Box>
                                    <Typography variant="h4">{stats.resolved}</Typography>
                                    <Typography variant="body2" color="text.secondary">
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
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Quick Actions
                            </Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => navigate('/queries/new')}
                                >
                                    New Query
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/queries')}
                                >
                                    View All Queries
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Queries */}
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Recent Queries</Typography>
                        <Button
                            variant="text"
                            onClick={() => navigate('/queries')}
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