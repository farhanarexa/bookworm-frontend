"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiCheck, HiTrash } from 'react-icons/hi';

export default function AdminReviewsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get('/api/reviews/pending');
            setReviews(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                router.push('/');
                return;
            }
            fetchReviews();
        }
    }, [user, authLoading, router]);

    const handleApprove = async (id) => {
        try {
            await axios.put(`/api/reviews/${id}/approve`);
            toast.success('Review approved');
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            toast.error('Failed to approve review');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await axios.delete(`/api/reviews/${id}`);
            toast.success('Review deleted');
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    if (authLoading || loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8">Pending Reviews</h1>

            {reviews.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md border border-stone-200">
                    <ul className="divide-y divide-stone-200">
                        {reviews.map((review) => (
                            <li key={review._id} className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-stone-900">
                                                {review.book?.title || 'Unknown Book'}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Rating: {review.rating}/5
                                            </span>
                                        </div>
                                        <p className="text-sm text-stone-500 mb-2">By {review.user?.name || 'Unknown User'}</p>
                                        <p className="text-stone-700 italic">"{review.content}"</p>
                                    </div>
                                    <div className="ml-6 flex items-center space-x-3">
                                        <button
                                            onClick={() => handleApprove(review._id)}
                                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            title="Approve"
                                        >
                                            <HiCheck className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            title="Delete"
                                        >
                                            <HiTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-stone-200">
                    <p className="text-stone-500">No pending reviews to moderate.</p>
                </div>
            )}
        </div>
    );
}
