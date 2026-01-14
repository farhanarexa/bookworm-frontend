"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HiBookOpen, HiCheck, HiClock, HiBookmark } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyLibraryPage() {
    return (
        <ProtectedRoute>
            <MyLibraryPageContent />
        </ProtectedRoute>
    );
}

function MyLibraryPageContent() {
    const { user } = useAuth();
    const [library, setLibrary] = useState({ wantToRead: [], currentlyReading: [], read: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('currentlyReading');

    const fetchLibrary = async () => {
        try {
            const { data } = await axios.get('/api/users/library');
            setLibrary(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLibrary();
        }
    }, [user]);

    const addToShelf = async (bookId, shelf, progress = 0, totalLength = 0) => {
        try {
            await axios.post('/api/users/shelf', {
                bookId,
                shelf,
                progress,
                totalLength
            });
            toast.success('Progress updated');
            fetchLibrary();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update progress');
        }
    };

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;

    const tabs = [
        { id: 'currentlyReading', label: 'Currently Reading', icon: HiBookOpen, count: library.currentlyReading.length },
        { id: 'wantToRead', label: 'Want to Read', icon: HiBookmark, count: library.wantToRead.length },
        { id: 'read', label: 'Read', icon: HiCheck, count: library.read.length },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8">My Library</h1>

            {/* Tabs */}
            <div className="border-b border-stone-200 mb-8 overflow-x-auto pb-1">
                <nav className="-mb-px flex space-x-8 min-w-max px-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id
                                    ? 'border-amber-500 text-amber-600'
                                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                            >
                                <Icon className={`mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-amber-500' : 'text-stone-400'}`} />
                                {tab.label}
                                <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === tab.id ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-900'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'currentlyReading' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {library.currentlyReading.length > 0 ? (
                            library.currentlyReading.map((item) => (
                                <div key={item.book._id} className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 flex space-x-4 h-full">
                                    <div className="flex-shrink-0 w-24 aspect-[2/3] bg-stone-200 rounded overflow-hidden">
                                        <img src={item.book.coverImage} alt={item.book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <h3 className="text-lg font-bold text-stone-900 truncate">{item.book.title}</h3>
                                        <p className="text-sm text-stone-500 mb-4 truncate">{item.book.author}</p>

                                        <div className="mt-auto">
                                            <div className="mb-2 flex justify-between text-xs text-stone-500">
                                                <span>Progress</span>
                                                <span>{item.progress} / {item.totalLength || '?'} pages</span>
                                            </div>
                                            <div className="w-full bg-stone-200 rounded-full h-2.5 mb-4">
                                                <div
                                                    className="bg-amber-600 h-2.5 rounded-full"
                                                    style={{ width: `${item.totalLength ? Math.min((item.progress / item.totalLength) * 100, 100) : 0}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex flex-col space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        placeholder="Page"
                                                        defaultValue={item.progress}
                                                        className="w-16 px-2 py-1 text-xs border border-stone-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                                        onBlur={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val)) addToShelf(item.book._id, 'currentlyReading', val, item.totalLength);
                                                        }}
                                                    />
                                                    <span className="text-xs text-stone-400">/</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Total"
                                                        defaultValue={item.totalLength}
                                                        className="w-16 px-2 py-1 text-xs border border-stone-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                                        onBlur={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val)) addToShelf(item.book._id, 'currentlyReading', item.progress, val);
                                                        }}
                                                    />
                                                </div>
                                                <Link href={`/books/${item.book._id}`} className="text-xs text-amber-700 hover:text-amber-700 font-medium">
                                                    View Details &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-stone-500 border-2 border-dashed border-stone-200 rounded-lg">
                                Not reading anything right now. <Link href="/books" className="text-amber-600 hover:underline">Find a book</Link> to start!
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'wantToRead' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {library.wantToRead.length > 0 ? (
                            library.wantToRead.map((book) => (
                                <Link href={`/books/${book._id}`} key={book._id} className="group flex flex-col h-full">
                                    <div className="aspect-3/4 w-full overflow-hidden rounded-lg bg-stone-200">
                                        <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-3 flex flex-col flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-stone-900 group-hover:text-amber-700 truncate">{book.title}</h3>
                                        <p className="text-xs text-stone-500 truncate">{book.author}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-stone-500 border-2 border-dashed border-stone-200 rounded-lg">
                                Your wishlist is empty. <Link href="/books" className="text-amber-600 hover:underline">Browse books</Link> to add some!
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'read' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {library.read.length > 0 ? (
                            library.read.map((book) => (
                                <Link href={`/books/${book._id}`} key={book._id} className="group flex flex-col h-full">
                                    <div className="aspect-3/4 w-full overflow-hidden rounded-lg bg-stone-200">
                                        <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-3 flex flex-col flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-stone-900 group-hover:text-amber-700 truncate">{book.title}</h3>
                                        <p className="text-xs text-stone-500 truncate">{book.author}</p>
                                        <div className="mt-2 flex items-center">
                                            <HiCheck className="w-4 h-4 text-green-500 mr-1" />
                                            <span className="text-xs text-green-600">Finished</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-stone-500 border-2 border-dashed border-stone-200 rounded-lg">
                                Haven&apos;t finished any books yet? Keep reading!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
