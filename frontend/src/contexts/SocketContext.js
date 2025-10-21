import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
            const newSocket = io(socketURL, {
                auth: {
                    token: localStorage.getItem('token')
                }
            });

            newSocket.on('connect', () => {
                console.log('Connected to server');
                setConnected(true);
                newSocket.emit('join-room', user.id);
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
                setConnected(false);
            });

            newSocket.on('query-created', (query) => {
                toast.success('New query created successfully!');
                // You can add more specific handling here
            });

            newSocket.on('query-updated', (query) => {
                if (query.adminResponse) {
                    toast.success('You have a new response to your query!');
                } else {
                    toast.info('Your query status has been updated');
                }
                // You can add more specific handling here
            });

            newSocket.on('notification', (notification) => {
                toast(notification.message, {
                    icon: getNotificationIcon(notification.type),
                    duration: 6000
                });
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [user]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'query-response':
                return '💬';
            case 'status-update':
                return '📋';
            case 'system':
                return '⚙️';
            case 'reminder':
                return '⏰';
            default:
                return '📢';
        }
    };

    const value = {
        socket,
        connected
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};