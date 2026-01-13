"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
    HiBookOpen,
    HiUsers,
    HiStar,
    HiPlus,
    HiVideoCamera,
    HiAdjustments,
    HiChartPie
} from 'react-icons/hi';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';

const COLORS = ['#D97706', '#059669', '#2563EB', '#7C3AED', '#DB2777', '#4B5563'];

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                router.push('/');
                return;
            }

            const fetchStats = async () => {
                try {
                    const { data } = await axios.get('/api/admin/stats');
                    setStats(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
    );

    const statCards = [
        { label: 'Total Books', value: stats.totalBooks, icon: HiBookOpen, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Users', value: stats.totalUsers, icon: HiUsers, color: 'bg-green-100 text-green-600' },
        { label: 'Total Reviews', value: stats.totalReviews, icon: HiStar, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Total Tutorials', value: stats.totalTutorials, icon: HiVideoCamera, color: 'bg-purple-100 text-purple-600' },
    ];

    const managementLinks = [
        { title: 'Manage Books', desc: 'Add, edit, or remove books from the catalog.', href: '/admin/books', icon: HiBookOpen },
        { title: 'Manage Reviews', desc: 'Monitor and delete user reviews.', href: '/admin/reviews', icon: HiStar },
        { title: 'User Roles', desc: 'Manage user permissions and roles.', href: '/admin/users', icon: HiUsers },
        { title: 'Tutorials', desc: 'Manage video guides and lessons.', href: '/admin/tutorials', icon: HiVideoCamera },
        { title: 'Genre Management', desc: 'Manage book categories.', href: '/admin/genres', icon: HiAdjustments },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-stone-900 font-serif">Admin Dashboard</h1>
                    <p className="mt-2 text-stone-600">Overview of your library statistics and management tools.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link href="/admin/books/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
                        <HiPlus className="-ml-1 mr-2 h-5 w-5" />
                        Add New Book
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center">
                        <div className={`p-3 rounded-xl ${card.color} mr-4`}>
                            <card.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500">{card.label}</p>
                            <p className="text-2xl font-bold text-stone-900">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-stone-900 flex items-center">
                            <HiChartPie className="mr-2 text-amber-600" />
                            Genre Distribution
                        </h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.genreDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.genreDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions / Activity Placeholder */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center">
                        <HiAdjustments className="mr-2 text-amber-600" />
                        Management Links
                    </h2>
                    <div className="space-y-4">
                        {managementLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="flex items-start p-3 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100"
                            >
                                <div className="p-2 bg-amber-50 rounded text-amber-600 mr-3">
                                    <link.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">{link.title}</p>
                                    <p className="text-xs text-stone-500 mt-0.5">{link.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
