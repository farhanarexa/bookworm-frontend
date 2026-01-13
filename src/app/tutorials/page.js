"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function TutorialsPage() {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');

    const categories = ['Reading Tips', 'Writing', 'Book Reviews', 'Library Tours', 'Other'];

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const { data } = await axios.get(`/api/tutorials${category ? `?category=${category}` : ''}`);
                setTutorials(data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load tutorials');
                setLoading(false);
            }
        };
        fetchTutorials();
    }, [category]);

    // Helper to get YouTube ID from URL
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900 font-serif">Learning Center</h1>
                    <p className="mt-2 text-stone-600">Video guides to enhance your reading experience.</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setCategory('')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${category === '' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${category === cat ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-video bg-stone-200 rounded-lg mb-4"></div>
                            <div className="h-6 bg-stone-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-stone-100 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            ) : tutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((tutorial) => {
                        const videoId = getYouTubeId(tutorial.url);
                        return (
                            <div key={tutorial._id} className="group flex flex-col">
                                <div className="aspect-video rounded-lg overflow-hidden bg-stone-200 shadow-sm border border-stone-200">
                                    {videoId ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={tutorial.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-stone-400">
                                            Invalid Video URL
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                                        {tutorial.title}
                                    </h3>
                                    <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 w-fit">
                                        {tutorial.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-24 bg-stone-50 rounded-xl border-2 border-dashed border-stone-200">
                    <p className="text-stone-500">No tutorials found in this category yet.</p>
                </div>
            )}
        </div>
    );
}
