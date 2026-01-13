"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiUser, HiTrash, HiShieldCheck } from 'react-icons/hi';

export default function AdminUsersPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/admin/users');
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            if (!currentUser || currentUser.role !== 'admin') {
                router.push('/');
                return;
            }
            fetchUsers();
        }
    }, [currentUser, authLoading, router]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
            toast.success(`Role updated to ${newRole}`);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update role');
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            toast.success('User deleted');
            setUsers(users.filter(u => u._id !== userId));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    if (authLoading || loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-8 font-serif">User Management</h1>

            <div className="bg-white shadow-sm overflow-hidden sm:rounded-xl border border-stone-200">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-stone-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover border border-stone-200" src={u.photo} alt={u.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-stone-900">{u.name}</div>
                                            <div className="text-xs text-stone-500">Joined {new Date(u.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-stone-600">{u.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        disabled={u._id === currentUser._id}
                                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-amber-500 ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-800'
                                            }`}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        disabled={u._id === currentUser._id}
                                        className={`text-stone-400 hover:text-red-600 p-2 rounded-full border border-transparent hover:border-red-100 transition-all ${u._id === currentUser._id ? 'opacity-0 pointer-events-none' : ''
                                            }`}
                                    >
                                        <HiTrash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
