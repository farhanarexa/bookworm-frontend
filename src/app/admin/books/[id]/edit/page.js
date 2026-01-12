"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function EditBookPage() {
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        coverImage: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                router.push('/');
                return;
            }

            const fetchBook = async () => {
                try {
                    const { data } = await axios.get(`/api/books/${id}`);
                    setFormData({
                        title: data.title,
                        author: data.author,
                        genre: data.genre,
                        description: data.description,
                        coverImage: data.coverImage
                    });
                } catch (error) {
                    toast.error('Failed to load book');
                    router.push('/admin/books');
                } finally {
                    setLoading(false);
                }
            };
            fetchBook();
        }
    }, [user, authLoading, router, id]);

    const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Fantasy', 'Romance', 'History', 'Technology'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.put(`/api/books/${id}`, formData);
            toast.success('Book updated successfully');
            router.push('/admin/books');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update book');
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8">Edit Book</h1>

            <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded-lg shadow-md border border-stone-200 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-stone-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Genre</label>
                    <select
                        name="genre"
                        required
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                        value={formData.genre}
                        onChange={handleChange}
                    >
                        <option value="">Select a genre</option>
                        {genres.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Cover Image URL</label>
                    <input
                        type="url"
                        name="coverImage"
                        required
                        placeholder="https://example.com/image.jpg"
                        className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        value={formData.coverImage}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Description</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-white py-2 px-4 border border-stone-300 rounded-md shadow-sm text-sm font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        {submitting ? 'Updating...' : 'Update Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}
