import BooksClient from '@/components/BooksClient';
import { Suspense } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BooksPage() {
    return (
        <ProtectedRoute>
            <Suspense fallback={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-stone-900">Browse Books</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-stone-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            }>
                <BooksClient />
            </Suspense>
        </ProtectedRoute>
    );
}
