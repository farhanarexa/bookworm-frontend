"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { HiUser, HiBookOpen, HiStar, HiClock } from 'react-icons/hi';
import Link from 'next/link';

export default function ActivityFeed() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data } = await axios.get('/api/activities');
                setActivities(data);
            } catch (error) {
                console.error('Failed to fetch activities', error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-stone-100 rounded-lg"></div>
                ))}
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div className="text-center py-6 text-stone-500 italic text-sm">
                No recent activity. Start reading to see updates here!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity._id} className="flex items-start bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                    <img
                        src={activity.user?.photo || 'https://via.placeholder.com/40'}
                        alt={activity.user?.name}
                        className="h-10 w-10 rounded-full border border-stone-200 mr-3 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-stone-900 truncate">
                                {activity.user?.name || 'A reader'}
                            </p>
                            <span className="text-[10px] text-stone-400 flex items-center">
                                <HiClock className="mr-1" />
                                {new Date(activity.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">
                            {activity.details}{' '}
                            <Link href={`/books/${activity.book?._id}`} className="font-semibold text-amber-700 hover:underline">
                                {activity.book?.title}
                            </Link>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
