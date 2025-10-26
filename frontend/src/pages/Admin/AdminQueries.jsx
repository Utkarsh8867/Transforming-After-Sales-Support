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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material';
import { Search, Reply, Edit } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { adminAPI } from '../../services/api';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../components/Common/LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const AdminQueries = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        category: '',
        sentiment: '',
        search: '',
    });
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [responseDialog, setResponseDialog] = useState(false);
    const [statusDialog, setStatusDialog] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(
        ['admin-queries', page, filters],
        () => adminAPI.getQueries({ page, ...filters }),
        {
            keepPreviousData: true,
        }
    );

    const {
        register: registerResponse,
        handleSubmit: handleSubmitResponse,
        reset: resetResponse,
        formState: { errors: responseErrors },
    } = useForm();

    const {
        register: registerStatus,
        handleSubmit: handleSubmitStatus,
        reset: resetStatus,
        watch: watchStatus,
    } = useForm();

    const respondMutation = useMutation(
        ({ id, response }) => adminAPI.respondToQuery(id, response),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['admin-queries']);
                queryClient.invalidateQueries('admin-dashboard');
                toast.success('Response sent successfully!');
                setResponseDialog(false);
                resetResponse();
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Failed to send response');
            },
        }
    );

    const updateStatusMutation = useMutation(
        ({ id, update }) => adminAPI.updateQueryStatus(id, update),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['admin-queries']);
                queryClient.invalidateQueries('admin-dashboard');
                toast.success('Query updated successfully!');
                setStatusDialog(false);
                resetStatus();
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Failed to update query');
            },
        }
    );

    const queries = data?.data?.queries || [];
    const pagination = data?.data?.pagination || {};
    const stats = data?.data?.stats || {};

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
    };

    const handleRespond = (query) => {
        setSelectedQuery(query);
        setResponseDialog(true);
    };

    const handleUpdateStatus = (query) => {
        setSelectedQuery(query);
        resetStatus({
            status: query.status,
            priority: query.priority,
        });
        setStatusDialog(true);
    };

    const onSubmitResponse = (data) => {
        respondMutation.mutate({
            id: selectedQuery._id,
            response: data,
        });
    };

    const onSubmitStatus = (data) => {
        updateStatusMutation.mutate({
            id: selectedQuery._id,
            update: data,
        });
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

    const getSentimentColor = (sentiment) => {
        const colors = {
            positive: 'success',
            neutral: 'default',
            negative: 'error',
        };
        return colors[sentiment] || 'default';
    };

    if (isLoading && page === 1) {
        return <LoadingSpinner message="Loading queries..." />;
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">All Queries</Typography>
                <Box display="flex" gap={2}>
                    <Typography variant="body2" color="text.secondary">
                        Open: {stats.open || 0} | In Progress: {stats['in-progress'] || 0} |
                        Resolved: {stats.resolved || 0}
                    </Typography>
                </Box>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
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
                        <Grid item xs={6} md={2}>
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
                        <Grid item xs={6} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={filters.priority}
                                    label="Priority"
                                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="urgent">Urgent</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2}>
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
                        <Grid item xs={6} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Sentiment</InputLabel>
                                <Select
                                    value={filters.sentiment}
                                    label="Sentiment"
                                    onChange={(e) => handleFilterChange('sentiment', e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="positive">Positive</MenuItem>
                                    <MenuItem value="neutral">Neutral</MenuItem>
                                    <MenuItem value="negative">Negative</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => {
                                    setFilters({ status: '', priority: '', category: '', sentiment: '', search: '' });
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
                            <Typography variant="body2" color="text.secondary">
                                Try adjusting your filters to see more results.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Box>
                    {queries.map((query) => (
                        <Card key={query._id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Box flex={1}>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {query.subject}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Customer: {query.customer?.name} ({query.customer?.email})
                                        </Typography>
                                    </Box>
                                    <Box display="flex" gap={1} flexWrap="wrap">
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
                                        {query.sentiment && (
                                            <Chip
                                                label={query.sentiment.label}
                                                color={getSentimentColor(query.sentiment.label)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        mb: 2,
                                    }}
                                >
                                    {query.message}
                                </Typography>

                                {query.aiResponse && (
                                    <Box mb={2} p={2} bgcolor="primary.50" borderRadius={1}>
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

                                {query.adminResponse && (
                                    <Box mb={2} p={2} bgcolor="success.50" borderRadius={1}>
                                        <Typography variant="body2" fontWeight="medium" gutterBottom>
                                            Admin Response by {query.adminResponse.respondedBy?.name}:
                                        </Typography>
                                        <Typography variant="body2">
                                            {query.adminResponse.message}
                                        </Typography>
                                    </Box>
                                )}

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" gap={2}>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(query.createdAt).toLocaleDateString()} • {query.category}
                                        </Typography>
                                        {query.satisfactionRating && (
                                            <Typography variant="caption" color="text.secondary">
                                                Rating: {query.satisfactionRating}/5
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box display="flex" gap={1}>
                                        <Button
                                            size="small"
                                            startIcon={<Edit />}
                                            onClick={() => handleUpdateStatus(query)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={<Reply />}
                                            onClick={() => handleRespond(query)}
                                        >
                                            Respond
                                        </Button>
                                    </Box>
                                </Box>
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

            {/* Response Dialog */}
            <Dialog
                open={responseDialog}
                onClose={() => setResponseDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Respond to Query</DialogTitle>
                <DialogContent>
                    {selectedQuery && (
                        <Box mb={3}>
                            <Typography variant="subtitle2" gutterBottom>
                                Original Query:
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                    <strong>{selectedQuery.subject}</strong><br />
                                    {selectedQuery.message}
                                </Typography>
                            </Alert>

                            {selectedQuery.aiResponse && (
                                <Box mb={2}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        AI Response:
                                    </Typography>
                                    <Alert severity="info" variant="outlined">
                                        <Typography variant="body2">
                                            {selectedQuery.aiResponse.message}
                                        </Typography>
                                    </Alert>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleSubmitResponse(onSubmitResponse)}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Your Response"
                            placeholder="Type your response to the customer..."
                            {...registerResponse('message', {
                                required: 'Response message is required',
                                minLength: {
                                    value: 10,
                                    message: 'Response must be at least 10 characters',
                                },
                            })}
                            error={!!responseErrors.message}
                            helperText={responseErrors.message?.message}
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status after response</InputLabel>
                            <Select
                                label="Status after response"
                                defaultValue="resolved"
                                {...registerResponse('status')}
                            >
                                <MenuItem value="in-progress">In Progress</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResponseDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmitResponse(onSubmitResponse)}
                        variant="contained"
                        disabled={respondMutation.isLoading}
                    >
                        {respondMutation.isLoading ? 'Sending...' : 'Send Response'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Status Update Dialog */}
            <Dialog
                open={statusDialog}
                onClose={() => setStatusDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Update Query Status</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmitStatus(onSubmitStatus)} pt={1}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                label="Status"
                                {...registerStatus('status', { required: 'Status is required' })}
                            >
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="in-progress">In Progress</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                label="Priority"
                                {...registerStatus('priority')}
                            >
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="urgent">Urgent</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmitStatus(onSubmitStatus)}
                        variant="contained"
                        disabled={updateStatusMutation.isLoading}
                    >
                        {updateStatusMutation.isLoading ? 'Updating...' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminQueries;