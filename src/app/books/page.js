"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { HiSearch, HiFilter } from 'react-icons/hi';

export default function BooksPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');

    // Hardcoded genres for now, fetch from backend later if needed
    const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Fantasy', 'Romance', 'History', 'Technology'];

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const search = searchParams.get('keyword') || '';
                const genre = searchParams.get('genre') || '';
                const pageNum = searchParams.get('pageNumber') || 1;
                const { data } = await axios.get(`/api/books?keyword=${search}&genre=${genre}&pageNumber=${pageNum}`);
                setBooks(data.books);
                setPage(data.page);
                setPages(data.pages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams({ keyword, pageNumber: 1 });
    };

    const handleGenreChange = (genre) => {
        const newGenre = genre === selectedGenre ? '' : genre; // Toggle
        setSelectedGenre(newGenre);
        updateSearchParams({ genre: newGenre, pageNumber: 1 });
    };

    const handlePageChange = (pageNum) => {
        updateSearchParams({ pageNumber: pageNum });
    };

    const updateSearchParams = (params) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        Object.keys(params).forEach(key => {
            if (params[key]) {
                current.set(key, params[key]);
            } else {
                current.delete(key);
            }
        });

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`/books${query}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8">Browse Books</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 sticky top-24">
                        <h3 className="text-lg font-medium text-stone-900 mb-4 flex items-center">
                            <HiFilter className="mr-2 text-amber-600" /> Filters
                        </h3>

                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-stone-700 mb-2">Search</h4>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="block w-full pl-3 pr-10 py-2 border border-stone-300 rounded-md leading-5 bg-white placeholder-stone-500 focus:outline-none focus:placeholder-stone-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                        placeholder="Title or Author"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-amber-600">
                                        <HiSearch className="h-5 w-5" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-stone-700 mb-2">Genre</h4>
                            <div className="space-y-2">
                                {genres.map(genre => (
                                    <div key={genre} className="flex items-center">
                                        <input
                                            id={`genre-${genre}`}
                                            name="genre"
                                            type="checkbox"
                                            checked={selectedGenre === genre}
                                            onChange={() => handleGenreChange(genre)}
                                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                                        />
                                        <label htmlFor={`genre-${genre}`} className="ml-2 block text-sm text-stone-700">
                                            {genre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-stone-200 rounded-lg"></div>
                            ))}
                        </div>
                    ) : books.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {books.map((book) => (
                                    <Link href={`/books/${book._id}`} key={book._id} className="group bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                                        <div className="aspect-[3/4] bg-stone-200 overflow-hidden">
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-stone-900 group-hover:text-amber-700 truncate">{book.title}</h3>
                                                    <p className="text-sm text-stone-500 truncate">{book.author}</p>
                                                </div>
                                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 flex-shrink-0">
                                                    {book.genre}
                                                </span>
                                            </div>
                                            <div className="mt-auto flex items-center">
                                                <div className="flex text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`h-4 w-4 ${i < Math.round(book.averageRating) ? 'fill-current' : 'text-stone-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-xs text-stone-500">({book.ratingCount || 0})</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-stone-300 bg-white text-sm font-medium ${page === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-500 hover:bg-stone-50'}`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        {[...Array(pages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === i + 1 ? 'z-10 bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-stone-300 text-stone-500 hover:bg-stone-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === pages}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-stone-300 bg-white text-sm font-medium ${page === pages ? 'text-stone-300 cursor-not-allowed' : 'text-stone-500 hover:bg-stone-50'}`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="mt-2 text-sm font-medium text-stone-900">No books found</h3>
                            <p className="mt-1 text-sm text-stone-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
