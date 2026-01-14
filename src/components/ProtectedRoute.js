"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Redirect to login if not authenticated
                router.push('/auth/login');
            } else if (adminOnly && user.role !== 'admin') {
                // Redirect to home if admin access is required but user is not admin
                router.push('/');
            } else {
                // User is authenticated (and authorized if admin access required)
                setShouldRender(true);
            }
        }
    }, [user, loading, adminOnly, router]);

    // Show loading state while checking authentication
    if (loading || !shouldRender) {
        return (
            <div className="flex justify-center items-center h-screen text-amber-800">
                Loading...
            </div>
        );
    }

    return children;
}