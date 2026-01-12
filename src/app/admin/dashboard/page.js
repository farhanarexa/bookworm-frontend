"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { HiBookOpen, HiUsers, HiStar, HiPlus } from 'react-icons/hi';

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalBooks: 0,
        pendingReviews: 0,
        totalUsers: 0 // We don't have an endpoint for this yet, so maybe skip or mock
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                router.push('/');
                return;
            }

            const fetchStats = async () => {
                try {
                    // Fetch real stats
                    // For now we can fetch books count and pending reviews count
                    const booksRes = await axios.get('/api/books?pageNumber=1');
                    const reviewsRes = await axios.get('/api/reviews/pending');

                    setStats({
                        totalBooks: booksRes.data.count,
                        pendingReviews: reviewsRes.data.length,
                        totalUsers: '-' // Placeholder
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <HiBookOpen className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-500">Total Books</p>
                        <p className="text-2xl font-bold text-stone-900">{stats.totalBooks}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <HiStar className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-500">Pending Reviews</p>
                        <p className="text-2xl font-bold text-stone-900">{stats.pendingReviews}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <HiUsers className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-500">Total Users</p>
                        <p className="text-2xl font-bold text-stone-900">{stats.totalUsers}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/books" className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700">Manage Books</h3>
                        <HiBookOpen className="h-6 w-6 text-stone-400 group-hover:text-amber-600" />
                    </div>
                    <p className="text-stone-600 mb-4">Add, edit, or remove books from the library catalog.</p>
                    <span className="text-amber-600 text-sm font-medium group-hover:underline">Go to Books &rarr;</span>
                </Link>

                <Link href="/admin/reviews" className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700">Moderate Reviews</h3>
                        <HiStar className="h-6 w-6 text-stone-400 group-hover:text-amber-600" />
                    </div>
                    <p className="text-stone-600 mb-4">Approve or reject user submitted reviews.</p>
                    <span className="text-amber-600 text-sm font-medium group-hover:underline">Go to Reviews &rarr;</span>
                </Link>
            </div>

            <div className="mt-6">
                <Link href="/admin/books/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <HiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Book
                </Link>
            </div>
        </div>
    );
}
