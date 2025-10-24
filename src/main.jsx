import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
            light: '#4dabf7',
            dark: '#0056b3',
        },
        secondary: {
            main: '#6c757d',
            light: '#adb5bd',
            dark: '#495057',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
        success: {
            main: '#28a745',
            light: '#71dd8a',
            dark: '#1e7e34',
        },
        warning: {
            main: '#ffc107',
            light: '#ffecb3',
            dark: '#ff8f00',
        },
        info: {
            main: '#17a2b8',
            light: '#81d4fa',
            dark: '#0d7377',
        },
        error: {
            main: '#dc3545',
            light: '#f8d7da',
            dark: '#bd2130',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: 'all 0.3s ease-in-out',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                    boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRight: '1px solid rgba(0, 123, 255, 0.1)',
                },
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <SocketProvider>
                            <App />
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    duration: 4000,
                                    style: {
                                        background: '#363636',
                                        color: '#fff',
                                    },
                                }}
                            />
                        </SocketProvider>
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);