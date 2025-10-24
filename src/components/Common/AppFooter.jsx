import React from 'react';
import { Box, Typography, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppFooter = () => {
    const navigate = useNavigate();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                        src="/OIP.jpg"
                        alt="AI Customer Service"
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        © 2024 AI-Powered Customer Service
                    </Typography>
                </Box>

                <Box display="flex" gap={3}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate('/about')}
                        sx={{ cursor: 'pointer' }}
                    >
                        About
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        Built with AI & ❤️
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AppFooter;