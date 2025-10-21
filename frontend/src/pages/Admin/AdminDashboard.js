import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import {
    QuestionAnswer,
    TrendingUp,
    Schedule,
    CheckCircle,
    Assessment,
    People,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        'admin-dashboard',
        adminAPI.getDashboard,
        {
            refetchInterval: 30000,
        }
    );

    if (isLoading) {
        return <LoadingSpinner message="Loading admin dashboard..." />;
    }

    const dashboardData = data?.data || {};
    const {
        overview = {},
        statusDistribution = {},
        priorityDistribution = {},
        sentimentDistribution = {},
        performance = {},
    } = dashboardData;

    // Prepare chart data
    const statusChartData = Object.entries(statusDistribution).map(([key, value]) => ({
        name: key,
        value,
    }));

    const priorityChartData = Object.entries(priorityDistribution).map(([key, value]) => ({
        name: key,
        value,
    }));

    const sentimentChartData = Object.entries(sentimentDistribution).map(([key, value]) => ({
        name: key,
        value,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Monitor and manage customer service queries
                </Typography>
            </Box>

            {/* Overview Stats */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <QuestionAnswer color="primary" />
                                <Box>
                                    <Typography variant="h4">{overview.totalQueries || 0}</Typography>
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
                                    <Typography variant="h4">{overview.todayQueries || 0}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Today's Queries
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
                                    <Typography variant="h4">{overview.weekQueries || 0}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This Week
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
                                <CheckCircle color="success" />
                                <Box>
                                    <Typography variant="h4">{overview.monthQueries || 0}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This Month
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Performance Metrics */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Performance Metrics
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2">Average Response Time</Typography>
                                <Typography variant="h6">
                                    {Math.round(performance.avgResponseTime || 0)} min
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body2">Average Satisfaction</Typography>
                                <Typography variant="h6">
                                    {(performance.avgSatisfactionRating || 0).toFixed(1)}/5.0
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Total Ratings</Typography>
                                <Typography variant="h6">{performance.totalRatings || 0}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Quick Actions
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<QuestionAnswer />}
                                    onClick={() => navigate('/admin/queries')}
                                    fullWidth
                                >
                                    View All Queries
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Assessment />}
                                    onClick={() => navigate('/admin/queries?status=open')}
                                    fullWidth
                                >
                                    Open Queries
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<People />}
                                    onClick={() => navigate('/admin/queries?priority=urgent')}
                                    fullWidth
                                >
                                    Urgent Queries
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Status Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statusChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {statusChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Priority Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={priorityChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Sentiment Analysis
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={sentimentChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {sentimentChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;