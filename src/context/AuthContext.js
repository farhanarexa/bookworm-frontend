"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await axios.get('/api/users/profile');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (userData) => {
        try {
            let photoUrl = userData.photo;

            // If photo is a file object, upload it first
            if (userData.photoFile) {
                const formData = new FormData();
                formData.append('image', userData.photoFile);

                const { data: uploadData } = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                photoUrl = uploadData.image;
            }

            const { name, email, password } = userData;
            const { data } = await axios.post('/api/users', { name, email, password, photo: photoUrl });
            setUser(data);
            toast.success('Registration Successful');
            if (data.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/my-library');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    // Login
    const login = async (userData) => {
        try {
            const { data } = await axios.post('/api/users/login', userData);
            setUser(data);
            toast.success('Login Successful');
            if (data.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/my-library');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    // Logout
    const logout = async () => {
        try {
            await axios.post('/api/users/logout');
            setUser(null);
            router.push('/auth/login');
            toast.success('Logged out');
        } catch (error) {
            console.error(error);
        }
    };

    // Check authentication and redirect if needed
    const checkAuthAndRedirect = (requiredRole = null) => {
        if (!user) {
            router.push('/auth/login');
            return false;
        }

        if (requiredRole && user.role !== requiredRole) {
            router.push('/');
            return false;
        }

        return true;
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading, checkAuthAndRedirect }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
