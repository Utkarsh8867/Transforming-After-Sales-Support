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
    Paper,
} from '@mui/material';
import { ArrowBack, ThumbUp } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { queriesAPI } from '../../services/api';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../components/Common/LoadingSpinner.jsx';
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
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const rating = watch('rating');

    const rateQueryMutation = useMutation(
        (ratingData) => {
            console.log('API call - Rating data:', ratingData);
            return queriesAPI.rateQuery(id, ratingData);
        },
        {
            onSuccess: (response) => {
                console.log('Rating submitted successfully:', response);
                queryClient.invalidateQueries(['query', id]);
                toast.success('Thank you for your feedback!');
                setShowRating(false);
                reset();
            },
            onError: (error) => {
                console.error('Rating submission error:', error);
                const errorMessage = error.response?.data?.message ||
                    error.response?.data?.errors?.[0]?.msg ||
                    'Failed to submit rating';
                toast.error(errorMessage);
            },
        }
    );

    const onSubmitRating = (data) => {
        if (!data.rating) {
            toast.error('Please select a rating before submitting');
            return;
        }

        const ratingData = {
            rating: parseInt(data.rating),
            feedback: data.feedback || ''
        };

        console.log('Submitting rating:', ratingData); // Debug log
        rateQueryMutation.mutate(ratingData);
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
                                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                                    <Rating
                                                        name="rating"
                                                        value={rating || 0}
                                                        onChange={(event, newValue) => {
                                                            console.log('Rating changed to:', newValue);
                                                            setValue('rating', newValue, { shouldValidate: true });
                                                        }}
                                                        size="large"
                                                        precision={1}
                                                    />
                                                    {rating && (
                                                        <Typography variant="body2" color="primary">
                                                            {rating} star{rating !== 1 ? 's' : ''}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                <input
                                                    type="hidden"
                                                    {...register('rating', {
                                                        required: 'Please provide a rating',
                                                        min: { value: 1, message: 'Please select at least 1 star' },
                                                        max: { value: 5, message: 'Rating cannot exceed 5 stars' }
                                                    })}
                                                />
                                                {errors.rating && (
                                                    <Typography variant="caption" color="error" display="block" mt={1}>
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
                                                    disabled={rateQueryMutation.isLoading || !rating}
                                                >
                                                    {rateQueryMutation.isLoading
                                                        ? 'Submitting...'
                                                        : rating
                                                            ? `Submit ${rating} Star Rating`
                                                            : 'Submit Rating'
                                                    }
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setShowRating(false);
                                                        reset();
                                                    }}
                                                    disabled={rateQueryMutation.isLoading}
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