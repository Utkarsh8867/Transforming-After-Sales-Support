import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Queries from './pages/Queries/Queries';
import QueryDetail from './pages/Queries/QueryDetail';
import CreateQuery from './pages/Queries/CreateQuery';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminQueries from './pages/Admin/AdminQueries';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';
import LoadingSpinner from './components/Common/LoadingSpinner';

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <LoadingSpinner />
            </Box>
        );
    }

    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/queries" element={<Queries />} />
                <Route path="/queries/new" element={<CreateQuery />} />
                <Route path="/queries/:id" element={<QueryDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />

                {user.role === 'admin' && (
                    <>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/queries" element={<AdminQueries />} />
                    </>
                )}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}

export default App;