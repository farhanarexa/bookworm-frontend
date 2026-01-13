"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiPlus, HiTrash, HiVideoCamera } from 'react-icons/hi';

export default function AdminTutorialsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newTutorial, setNewTutorial] = useState({ title: '', url: '', category: 'Other' });

    const categories = ['Reading Tips', 'Writing', 'Book Reviews', 'Library Tours', 'Other'];

    const fetchTutorials = async () => {
        try {
            const { data } = await axios.get('/api/tutorials');
            setTutorials(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load tutorials');
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
            fetchTutorials();
        }
    }, [user, authLoading, router]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tutorials', newTutorial);
            toast.success('Tutorial added');
            setNewTutorial({ title: '', url: '', category: 'Other' });
            setIsAdding(false);
            fetchTutorials();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add tutorial');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this tutorial?')) return;
        try {
            await axios.delete(`/api/tutorials/${id}`);
            toast.success('Tutorial removed');
            setTutorials(tutorials.filter(t => t._id !== id));
        } catch (error) {
            toast.error('Failed to delete tutorial');
        }
    };

    if (authLoading || loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-stone-900 font-serif">Manage Tutorials</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
                >
                    <HiPlus className="-ml-1 mr-2 h-5 w-5" />
                    {isAdding ? 'Cancel' : 'Add Tutorial'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-stone-700">Video Title</label>
                            <input
                                type="text"
                                required
                                value={newTutorial.title}
                                onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
                                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                placeholder="How to annotate books"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-stone-700">YouTube URL</label>
                            <input
                                type="url"
                                required
                                value={newTutorial.url}
                                onChange={(e) => setNewTutorial({ ...newTutorial, url: e.target.value })}
                                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-stone-700">Category</label>
                            <select
                                value={newTutorial.category}
                                onChange={(e) => setNewTutorial({ ...newTutorial, category: e.target.value })}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                        >
                            Save Tutorial
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white shadow-sm overflow-hidden sm:rounded-xl border border-stone-200">
                <ul className="divide-y divide-stone-200">
                    {tutorials.length > 0 ? tutorials.map((t) => (
                        <li key={t._id} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-stone-100 rounded text-stone-500">
                                    <HiVideoCamera className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-stone-900">{t.title}</h4>
                                    <p className="text-xs text-stone-500 mt-0.5">{t.category} • {t.url}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(t._id)}
                                className="p-2 text-stone-400 hover:text-red-600 border border-transparent hover:border-red-100 rounded-full transition-all"
                            >
                                <HiTrash className="h-5 w-5" />
                            </button>
                        </li>
                    )) : (
                        <li className="p-12 text-center text-stone-500 italic">No tutorials found. Add your first one above!</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
