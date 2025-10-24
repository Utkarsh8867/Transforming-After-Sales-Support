import React, { useState } from 'react';
import { Box, Typography, Rating, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const RatingTest = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    const watchedRating = watch('rating');

    const handleRatingChange = (event, newValue) => {
        console.log('Rating changed:', newValue);
        setRating(newValue);
        setValue('rating', newValue, { shouldValidate: true });
    };

    const onSubmitForm = (data) => {
        console.log('Form submitted with data:', data);
        if (onSubmit) {
            onSubmit(data);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmitForm)} p={3} border={1} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
                Rating Test Component
            </Typography>

            <Box mb={2}>
                <Typography component="legend" gutterBottom>
                    Select Rating:
                </Typography>
                <Rating
                    name="rating-test"
                    value={rating}
                    onChange={handleRatingChange}
                    size="large"
                />
                <input
                    type="hidden"
                    {...register('rating', { required: 'Please provide a rating' })}
                />
                <Typography variant="body2" mt={1}>
                    Current rating: {rating} (Form value: {watchedRating})
                </Typography>
                {errors.rating && (
                    <Typography variant="caption" color="error" display="block">
                        {errors.rating.message}
                    </Typography>
                )}
            </Box>

            <TextField
                fullWidth
                label="Feedback"
                multiline
                rows={2}
                {...register('feedback')}
                sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" disabled={!rating}>
                Submit Test Rating
            </Button>

            <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
                <Typography variant="caption">
                    Debug Info:<br />
                    State Rating: {rating}<br />
                    Form Rating: {watchedRating}<br />
                    Has Errors: {Object.keys(errors).length > 0 ? 'Yes' : 'No'}
                </Typography>
            </Box>
        </Box>
    );
};

export default RatingTest;