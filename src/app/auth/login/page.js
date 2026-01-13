"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-stone-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="text-amber-700 hover:text-amber-900 font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
