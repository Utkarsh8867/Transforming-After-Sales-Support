import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Grid,
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { queriesAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Queries = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        status: '',
        category: '',
        search: '',
    });
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ['queries', page, filters],
        () => queriesAPI.getQueries({ page, ...filters }),
        {
            keepPreviousData: true,
        }
    );

    const queries = data?.data?.queries || [];
    const pagination = data?.data?.pagination || {};

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
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

    if (isLoading && page === 1) {
        return <LoadingSpinner message="Loading queries..." />;
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">My Queries</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/queries/new')}
                >
                    New Query
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Search queries..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                InputProps={{
                                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status}
                                    label="Status"
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="open">Open</MenuItem>
                                    <MenuItem value="in-progress">In Progress</MenuItem>
                                    <MenuItem value="resolved">Resolved</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={filters.category}
                                    label="Category"
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="general">General</MenuItem>
                                    <MenuItem value="technical">Technical</MenuItem>
                                    <MenuItem value="billing">Billing</MenuItem>
                                    <MenuItem value="complaint">Complaint</MenuItem>
                                    <MenuItem value="feature-request">Feature Request</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => {
                                    setFilters({ status: '', category: '', search: '' });
                                    setPage(1);
                                }}
                            >
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Queries List */}
            {queries.length === 0 ? (
                <Card>
                    <CardContent>
                        <Box textAlign="center" py={4}>
                            <Typography variant="h6" gutterBottom>
                                No queries found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                {filters.search || filters.status || filters.category
                                    ? 'Try adjusting your filters or create a new query.'
                                    : 'Create your first query to get started with our AI-powered support.'}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => navigate('/queries/new')}
                            >
                                Create Query
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Box>
                    {queries.map((query) => (
                        <Card
                            key={query._id}
                            sx={{
                                mb: 2,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 2,
                                },
                            }}
                            onClick={() => navigate(`/queries/${query._id}`)}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Typography variant="h6" component="h3">
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
                                        mb: 2,
                                    }}
                                >
                                    {query.message}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" gap={2}>
                                        <Typography variant="caption" color="text.secondary">
                                            Category: {query.category}
                                        </Typography>
                                        {query.sentiment && (
                                            <Typography variant="caption" color="text.secondary">
                                                Sentiment: {query.sentiment.label}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(query.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>

                                {query.aiResponse && (
                                    <Box mt={2} p={2} bgcolor="action.hover" borderRadius={1}>
                                        <Typography variant="body2" fontWeight="medium" gutterBottom>
                                            AI Response:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {query.aiResponse.message}
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={pagination.pages}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Queries;