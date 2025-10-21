import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
    Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updatePreferences } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            emailNotifications: user?.preferences?.notifications?.email ?? true,
            pushNotifications: user?.preferences?.notifications?.push ?? true,
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);

        const preferences = {
            notifications: {
                email: data.emailNotifications,
                push: data.pushNotifications,
            },
        };

        const result = await updatePreferences(preferences);

        if (result.success) {
            toast.success('Preferences updated successfully!');
        }

        setLoading(false);
    };

    return (
        <Box maxWidth="md" mx="auto">
            <Typography variant="h4" gutterBottom>
                Profile Settings
            </Typography>

            <Grid container spacing={3}>
                {/* User Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                User Information
                            </Typography>

                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">
                                    {user?.name}
                                </Typography>
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">
                                    {user?.email}
                                </Typography>
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="text.secondary">
                                    Role
                                </Typography>
                                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                                    {user?.role}
                                </Typography>
                            </Box>

                            <Alert severity="info" sx={{ mt: 2 }}>
                                To update your personal information, please contact support.
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notification Preferences */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Notification Preferences
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...register('emailNotifications')}
                                            defaultChecked={user?.preferences?.notifications?.email ?? true}
                                        />
                                    }
                                    label="Email Notifications"
                                    sx={{ mb: 2, display: 'block' }}
                                />

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, ml: 4 }}>
                                    Receive email notifications for query responses and updates
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...register('pushNotifications')}
                                            defaultChecked={user?.preferences?.notifications?.push ?? true}
                                        />
                                    }
                                    label="Push Notifications"
                                    sx={{ mb: 2, display: 'block' }}
                                />

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, ml: 4 }}>
                                    Receive real-time notifications in the application
                                </Typography>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading ? 'Saving...' : 'Save Preferences'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Account Statistics */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Account Statistics
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center">
                                        <Typography variant="h4" color="primary">
                                            -
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Queries
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center">
                                        <Typography variant="h4" color="success.main">
                                            -
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Resolved Queries
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center">
                                        <Typography variant="h4" color="info.main">
                                            -
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Average Rating
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Alert severity="info" sx={{ mt: 2 }}>
                                Detailed statistics will be available in a future update.
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;