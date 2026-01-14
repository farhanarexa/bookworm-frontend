"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX, HiUser, HiLogout, HiBookOpen, HiHome, HiCollection } from 'react-icons/hi';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'text-amber-700 bg-amber-50' : 'text-stone-600 hover:text-amber-700 hover:bg-amber-50';

    return (
        <nav className="bg-amber-50 border-b border-stone-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-serif font-bold text-amber-800">Bookworm</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/' ? 'border-amber-500 text-amber-900' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'}`}>
                                Home
                            </Link>
                            <Link href="/books" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname.includes('/books') ? 'border-amber-500 text-amber-900' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'}`}>
                                Browse Books
                            </Link>
                            <Link
                                href="/tutorials"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname.includes('/tutorials') ? 'border-amber-500 text-amber-900' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'}`}
                            >
                                Tutorials
                            </Link>
                            {user && user.role !== 'admin' && (
                                <Link href="/my-library" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/my-library' ? 'border-amber-500 text-amber-900' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'}`}>
                                    My Library
                                </Link>
                            )}
                            {user && user.role === 'admin' && (
                                <Link href="/admin/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname.includes('/admin') ? 'border-amber-500 text-amber-900' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'}`}>
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold overflow-hidden">
                                        {user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-stone-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-1 rounded-full text-stone-400 hover:text-amber-600 focus:outline-none"
                                    title="Logout"
                                >
                                    <HiLogout className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link href="/auth/login" className="text-stone-500 hover:text-amber-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="bg-amber-700 text-white hover:bg-amber-800 px-4 py-2 rounded-md text-sm font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white shadow-lg">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname === '/' ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700'}`}>
                            Home
                        </Link>
                        <Link href="/books" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname.includes('/books') ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700'}`}>
                            Browse Books
                        </Link>
                        <Link
                            href="/tutorials"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname.includes('/tutorials') ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Tutorials
                        </Link>
                        {user && user.role !== 'admin' && (
                            <Link href="/my-library" className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname === '/my-library' ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700'}`}>
                                My Library
                            </Link>
                        )}
                        {user && user.role === 'admin' && (
                            <Link
                                href="/admin/dashboard"
                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname.includes('/admin') ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        )}
                    </div>
                    <div className="pt-4 pb-4 border-t border-stone-200">
                        {user ? (
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold overflow-hidden">
                                        {user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-stone-800">{user.name}</div>
                                    <div className="text-sm font-medium text-stone-500">{user.email}</div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-stone-400 hover:text-stone-500 focus:outline-none"
                                >
                                    <HiLogout className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-1 px-2">
                                <Link href="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-stone-500 hover:text-stone-800 hover:bg-amber-100">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="block px-3 py-2 rounded-md text-base font-medium text-stone-500 hover:text-stone-800 hover:bg-amber-100">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
