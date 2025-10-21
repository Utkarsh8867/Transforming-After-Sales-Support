import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Divider,
    Button,
    Rating,
    TextField,
    Alert,
    Paper,
} from '@mui/material';
import { ArrowBack, ThumbUp, ThumbDown } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queriesAPI } from '../../services/api';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const QueryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showRating, setShowRating] = useState(false);

    const { data, isLoading } = useQuery(
        ['query', id],
        () => queriesAPI.getQuery(id),
        {
            enabled: !!id,
        }
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const rating = watch('rating');

    const rateQueryMutation = useMutation(
        (ratingData) => queriesAPI.rateQuery(id, ratingData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['query', id]);
                toast.success('Thank you for your feedback!');
                setShowRating(false);
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Failed to submit rating');
            },
        }
    );

    const onSubmitRating = (data) => {
        rateQueryMutation.mutate(data);
    };

    if (isLoading) {
        return <LoadingSpinner message="Loading query details..." />;
    }

    if (!data?.data?.query) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" gutterBottom>
                    Query not found
                </Typography>
                <Button variant="contained" onClick={() => navigate('/queries')}>
                    Back to Queries
                </Button>
            </Box>
        );
    }

    const query = data.data.query;

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

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/queries')}
                >
                    Back to Queries
                </Button>
            </Box>

            <Card>
                <CardContent>
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                {query.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Created on {new Date(query.createdAt).toLocaleDateString()} •
                                Category: {query.category}
                            </Typography>
                        </Box>
                        <Box display="flex" gap={1} flexWrap="wrap">
                            <Chip
                                label={query.status}
                                color={getStatusColor(query.status)}
                            />
                            <Chip
                                label={query.priority}
                                color={getPriorityColor(query.priority)}
                                variant="outlined"
                            />
                            {query.sentiment && (
                                <Chip
                                    label={`${query.sentiment.label} sentiment`}
                                    color={getSentimentColor(query.sentiment.label)}
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Original Query */}
                    <Box mb={3}>
                        <Typography variant="h6" gutterBottom>
                            Your Query
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                {query.message}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* AI Response */}
                    {query.aiResponse && (
                        <Box mb={3}>
                            <Typography variant="h6" gutterBottom>
                                AI Assistant Response
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'primary.50' }}>
                                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                    {query.aiResponse.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                    Generated on {new Date(query.aiResponse.generatedAt).toLocaleString()}
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {/* Admin Response */}
                    {query.adminResponse && (
                        <Box mb={3}>
                            <Typography variant="h6" gutterBottom>
                                Support Team Response
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50' }}>
                                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                    {query.adminResponse.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                    Responded by {query.adminResponse.respondedBy?.name} on{' '}
                                    {new Date(query.adminResponse.respondedAt).toLocaleString()}
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {/* Rating Section */}
                    {(query.status === 'resolved' || query.status === 'closed') && (
                        <Box>
                            <Divider sx={{ mb: 3 }} />

                            {query.satisfactionRating ? (
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Your Rating
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <Rating value={query.satisfactionRating} readOnly />
                                        <Typography variant="body2">
                                            ({query.satisfactionRating}/5 stars)
                                        </Typography>
                                    </Box>
                                    {query.feedback && (
                                        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                            <Typography variant="body2">
                                                <strong>Your feedback:</strong> {query.feedback}
                                            </Typography>
                                        </Paper>
                                    )}
                                </Box>
                            ) : (
                                <Box>
                                    {!showRating ? (
                                        <Box>
                                            <Typography variant="h6" gutterBottom>
                                                How was our service?
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mb={2}>
                                                Please rate your experience to help us improve our service.
                                            </Typography>
                                            <Box display="flex" gap={2}>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<ThumbUp />}
                                                    onClick={() => setShowRating(true)}
                                                >
                                                    Rate Experience
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box component="form" onSubmit={handleSubmit(onSubmitRating)}>
                                            <Typography variant="h6" gutterBottom>
                                                Rate Your Experience
                                            </Typography>

                                            <Box mb={2}>
                                                <Typography component="legend" gutterBottom>
                                                    Overall satisfaction:
                                                </Typography>
                                                <Rating
                                                    {...register('rating', { required: 'Please provide a rating' })}
                                                    value={rating || 0}
                                                    onChange={(event, newValue) => {
                                                        register('rating').onChange({
                                                            target: { value: newValue }
                                                        });
                                                    }}
                                                />
                                                {errors.rating && (
                                                    <Typography variant="caption" color="error">
                                                        {errors.rating.message}
                                                    </Typography>
                                                )}
                                            </Box>

                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label="Additional feedback (optional)"
                                                placeholder="Tell us more about your experience..."
                                                {...register('feedback')}
                                                sx={{ mb: 2 }}
                                            />

                                            <Box display="flex" gap={2}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={rateQueryMutation.isLoading}
                                                >
                                                    {rateQueryMutation.isLoading ? 'Submitting...' : 'Submit Rating'}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setShowRating(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Query Stats */}
                    {query.responseTime && (
                        <Box mt={3}>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                Response time: {query.responseTime} minutes
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default QueryDetail;