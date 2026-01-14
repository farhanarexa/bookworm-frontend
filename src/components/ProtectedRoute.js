"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children, adminOnly = false, redirectToMyLibrary = false }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && !loading) {
            if (!user) {
                // Redirect to login if not authenticated
                router.push('/auth/login');
            } else if (adminOnly && user.role !== 'admin') {
                // Redirect to home if admin access is required but user is not admin
                router.push('/');
            } else if (redirectToMyLibrary && user && user.role !== 'admin') {
                // Redirect regular users to my-library page
                router.push('/my-library');
            }
        }
    }, [user, loading, adminOnly, redirectToMyLibrary, router, isClient]);

    // Show loading state while checking authentication
    if (!isClient || loading || (!user && isClient)) {
        return (
            <div className="flex justify-center items-center h-screen text-amber-800">
                Loading...
            </div>
        );
    }

    // If user is not authorized for admin access
    if (adminOnly && user && user.role !== 'admin') {
        return (
            <div className="flex justify-center items-center h-screen text-amber-800">
                Access Denied
            </div>
        );
    }

    return children;
}