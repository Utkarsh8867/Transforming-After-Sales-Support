import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { queriesAPI } from '../../services/api';
import toast from 'react-hot-toast';

const CreateQuery = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const createQueryMutation = useMutation(queriesAPI.createQuery, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('queries');
            queryClient.invalidateQueries('dashboard-queries');
            toast.success('Query created successfully!');
            navigate(`/queries/${data.data.query._id}`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create query');
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await createQueryMutation.mutateAsync(data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth="md" mx="auto">
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Create New Query
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Describe your issue or question, and our AI assistant will provide an immediate response.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label="Subject"
                            margin="normal"
                            {...register('subject', {
                                required: 'Subject is required',
                                minLength: {
                                    value: 5,
                                    message: 'Subject must be at least 5 characters',
                                },
                            })}
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                defaultValue="general"
                                {...register('category')}
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="technical">Technical</MenuItem>
                                <MenuItem value="billing">Billing</MenuItem>
                                <MenuItem value="complaint">Complaint</MenuItem>
                                <MenuItem value="feature-request">Feature Request</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={6}
                            margin="normal"
                            placeholder="Please describe your issue or question in detail..."
                            {...register('message', {
                                required: 'Message is required',
                                minLength: {
                                    value: 10,
                                    message: 'Message must be at least 10 characters',
                                },
                            })}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                        />

                        <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
                            Our AI assistant will analyze your query and provide an immediate response.
                            If needed, our support team will follow up with additional assistance.
                        </Alert>

                        <Box display="flex" gap={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/queries')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Query'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateQuery;