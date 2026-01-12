"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { HiStar, HiPlus, HiCheck } from 'react-icons/hi';

export default function BookDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [reviewContent, setReviewContent] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [shelfLoading, setShelfLoading] = useState(false);

    useEffect(() => {
        const fetchBookAndReviews = async () => {
            if (!id) return;
            try {
                const [bookRes, reviewsRes] = await Promise.all([
                    axios.get(`/api/books/${id}`),
                    axios.get(`/api/reviews/book/${id}`)
                ]);
                setBook(bookRes.data);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookAndReviews();
    }, [id]);

    const handleAddToShelf = async (shelf) => {
        if (!user) {
            toast.error('Please login to manage your library');
            return;
        }

        setShelfLoading(true);
        try {
            await axios.post('/api/users/shelf', {
                bookId: book._id,
                shelf
            });
            toast.success(`Added to ${shelf.replace(/([A-Z])/g, ' $1').trim()}`);
        } catch (error) {
            toast.error('Failed to add to shelf');
        } finally {
            setShelfLoading(false);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to write a review');
            return;
        }

        setSubmittingReview(true);
        try {
            await axios.post('/api/reviews', {
                bookId: book._id,
                rating,
                content: reviewContent
            });
            toast.success('Review submitted for approval!');
            setReviewContent('');
            setRating(5);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return <div className="flex justify-center py-12">Loading...</div>;
    if (!book) return <div className="flex justify-center py-12">Book not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/3 bg-stone-100 p-8 flex justify-center items-start">
                        <img className="h-96 w-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" src={book.coverImage} alt={book.title} />
                    </div>
                    <div className="p-8 md:w-2/3">
                        <div className="uppercase tracking-wide text-sm text-amber-600 font-semibold">{book.genre}</div>
                        <h1 className="mt-1 text-3xl font-bold text-stone-900 leading-tight">{book.title}</h1>
                        <p className="mt-2 text-xl text-stone-600 font-medium">by {book.author}</p>

                        <div className="mt-4 flex items-center">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className={`h-6 w-6 ${i < Math.round(book.averageRating) ? 'fill-current' : 'text-stone-300'}`} />
                                ))}
                            </div>
                            <span className="ml-2 text-stone-600">({book.ratingCount} reviews)</span>
                        </div>

                        <p className="mt-6 text-stone-600 leading-relaxed text-lg">{book.description}</p>

                        {user && (
                            <div className="mt-8 border-t border-stone-200 pt-6">
                                <h3 className="text-sm font-medium text-stone-900 mb-3">Add to Shelf</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleAddToShelf('wantToRead')}
                                        disabled={shelfLoading}
                                        className="inline-flex items-center px-4 py-2 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
                                    >
                                        <HiPlus className="mr-1" /> Want to Read
                                    </button>
                                    <button
                                        onClick={() => handleAddToShelf('currentlyReading')}
                                        disabled={shelfLoading}
                                        className="inline-flex items-center px-4 py-2 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
                                    >
                                        <HiCheck className="mr-1" /> Currently Reading
                                    </button>
                                    <button
                                        onClick={() => handleAddToShelf('read')}
                                        disabled={shelfLoading}
                                        className="inline-flex items-center px-4 py-2 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
                                    >
                                        <HiCheck className="mr-1" /> Read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Reviews</h2>
                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                                    <div className="flex items-center mb-4">
                                        <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold overflow-hidden">
                                            {review.user?.photo && review.user.photo.startsWith('http') ? <img src={review.user.photo} alt={review.user.name} className="h-full w-full object-cover" /> : (review.user?.name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-stone-900">{review.user?.name}</div>
                                            <div className="flex text-amber-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <HiStar key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-stone-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-stone-600">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-stone-500 italic">No reviews yet. Be the first to review!</p>
                    )}
                </div>

                {user && (
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 h-fit">
                        <h3 className="text-xl font-bold text-amber-900 mb-4">Write a Review</h3>
                        <form onSubmit={submitReview} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <HiStar className={`h-8 w-8 ${star <= rating ? 'text-amber-500' : 'text-stone-300'} hover:text-amber-400 transition-colors`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Your Review</label>
                                <textarea
                                    className="w-full h-32 px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="What did you think of this book?"
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 font-medium"
                            >
                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
