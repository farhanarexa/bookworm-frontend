"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

export default function AdminBooksPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial fetch, hardcoded pagination for simplicity in admin view (fetch all or first page)
    const fetchBooks = async () => {
        try {
            // Fetch first 100 books or implement pagination later
            // Assuming the API returns latest books first or we can sort
            const { data } = await axios.get('/api/books?pageNumber=1');
            // Ideally backend returns all for admin or we implement pagination UI here too
            // For now, let's use the public API response which is paginated
            // If we need ALL books, we might need a specific admin endpoint or iterating pages
            // Keeping it simple: Showing first page, relying on search elsewhere if needed
            setBooks(data.books);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load books');
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
            fetchBooks();
        }
    }, [user, authLoading, router]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`/api/books/${id}`);
            toast.success('Book deleted');
            setBooks(books.filter(b => b._id !== id));
        } catch (error) {
            toast.error('Failed to delete book');
        }
    };

    if (authLoading || loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-stone-900">Manage Books</h1>
                <Link href="/admin/books/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <HiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Book
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-stone-200">
                <ul className="divide-y divide-stone-200">
                    {books.map((book) => (
                        <li key={book._id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                            <div className="flex items-center">
                                <div className="h-16 w-12 flex-shrink-0">
                                    <img className="h-16 w-12 object-cover rounded" src={book.coverImage} alt="" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-stone-900">{book.title}</h4>
                                    <p className="text-sm text-stone-500">{book.author}</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                                        {book.genre}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href={`/admin/books/${book._id}/edit`}
                                    className="p-2 text-stone-400 hover:text-amber-600 border border-stone-200 rounded-full hover:border-amber-600 transition-colors"
                                >
                                    <HiPencil className="h-5 w-5" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className="p-2 text-stone-400 hover:text-red-600 border border-stone-200 rounded-full hover:border-red-600 transition-colors"
                                >
                                    <HiTrash className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
