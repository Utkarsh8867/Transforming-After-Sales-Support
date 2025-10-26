import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Logo = ({ size = 'medium', showText = true, variant = 'default' }) => {
    const sizes = {
        small: { avatar: 32, fontSize: '0.875rem' },
        medium: { avatar: 48, fontSize: '1rem' },
        large: { avatar: 64, fontSize: '1.25rem' },
    };

    const currentSize = sizes[size];

    const logoStyles = {
        default: {
            avatar: {
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 2,
            },
            text: {
                color: 'primary.main',
                fontWeight: 'bold',
            }
        },
        white: {
            avatar: {
                border: '2px solid white',
                boxShadow: 3,
            },
            text: {
                color: 'white',
                fontWeight: 'bold',
            }
        },
        sidebar: {
            avatar: {
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 2,
            },
            text: {
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 1.2,
            }
        }
    };

    const currentStyle = logoStyles[variant];

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={showText ? 2 : 0}
            sx={{
                flexDirection: variant === 'sidebar' ? 'column' : 'row',
            }}
        >
            <Avatar
                src="/OIP.jpg"
                alt="AI Customer Service"
                sx={{
                    width: currentSize.avatar,
                    height: currentSize.avatar,
                    ...currentStyle.avatar
                }}
            />
            {showText && (
                <Typography
                    variant={size === 'large' ? 'h6' : 'subtitle1'}
                    component="div"
                    sx={{
                        fontSize: currentSize.fontSize,
                        ...currentStyle.text
                    }}
                >
                    AI Customer Service
                </Typography>
            )}
        </Box>
    );
};

export default Logo;