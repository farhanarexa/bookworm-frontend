"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiPlus, HiTrash, HiTag } from 'react-icons/hi';

export default function GenreManagementPage() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGenres = async () => {
        try {
            const { data } = await axios.get('/api/admin/genres');
            setGenres(data);
        } catch (error) {
            toast.error('Failed to fetch genres');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleAddGenre = async (e) => {
        e.preventDefault();
        if (!newGenre.trim()) return;

        try {
            await axios.post('/api/admin/genres', { name: newGenre.trim() });
            toast.success('Genre added');
            setNewGenre('');
            fetchGenres();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add genre');
        }
    };

    const handleDeleteGenre = async (id) => {
        if (!window.confirm('Are you sure you want to delete this genre?')) return;

        try {
            await axios.delete(`/api/admin/genres/${id}`);
            toast.success('Genre deleted');
            fetchGenres();
        } catch (error) {
            toast.error('Failed to delete genre');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900">Genre Management</h1>
                    <p className="text-stone-500 mt-1">Manage book categories for the library.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-8">
                <form onSubmit={handleAddGenre} className="flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Enter new genre name..."
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                    >
                        <HiPlus className="mr-2" /> Add Genre
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-stone-500">Loading genres...</td>
                            </tr>
                        ) : genres.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-stone-500">No genres found. Add your first one!</td>
                            </tr>
                        ) : (
                            genres.map((genre) => (
                                <tr key={genre._id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <HiTag className="text-amber-500 mr-2" />
                                            <span className="text-stone-900 font-medium">{genre.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                        {new Date(genre.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteGenre(genre._id)}
                                            className="text-red-600 hover:text-red-900 ml-4 font-bold"
                                        >
                                            <HiTrash className="inline mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
