"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ name, email, password, photoFile });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">Join Bookworm</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Profile Photo</label>
                        <input
                            type="file"
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            onChange={(e) => setPhotoFile(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-stone-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-amber-700 hover:text-amber-900 font-medium">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
