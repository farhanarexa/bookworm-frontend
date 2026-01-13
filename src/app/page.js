"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import GoalSetter from "@/components/GoalSetter";
import ActivityFeed from "@/components/ActivityFeed";

export default function Home() {
  // ... existing code ...
  const { user, loading, checkUserLoggedIn } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchRecommendations = async () => {
        try {
          const { data } = await axios.get('/api/books/recommendations');
          setRecommendations(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingRecs(false);
        }
      };
      fetchRecommendations();
    } else {
      setLoadingRecs(false);
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-amber-800">Loading...</div>;
  }

  const readCount = user?.read?.length || 0;
  const goal = user?.readingGoal || 0;
  const progressPercent = goal > 0 ? Math.min((readCount / goal) * 100, 100) : 0;

  if (!user) {
    // ... existing landing code ...
    return (
      <div className="relative isolate overflow-hidden bg-stone-900 py-24 sm:py-32 h-[calc(100vh-64px)] flex flex-col justify-center">
        <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Track your reading journey</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              Discover new worlds, keep track of what you&apos;ve read, and join a community of book lovers. Start your personal library today.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/auth/register" className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                Get started
              </Link>
              <Link href="/books" className="text-sm font-semibold leading-6 text-white">
                Browse books <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-stone-200 pb-6">
        <h1 className="text-3xl font-bold text-stone-900">Welcome back, {user.name}!</h1>
        <p className="mt-2 text-stone-600">Here are some books we think you&apos;ll love based on your reading history.</p>
      </div>

      {loadingRecs ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-stone-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {recommendations.length > 0 ? (
            recommendations.map((book) => (
              <Link href={`/books/${book._id}`} key={book._id} className="group flex flex-col h-full bg-white p-2 rounded-lg border border-transparent hover:border-stone-200 hover:shadow-sm transition-all">
                <div className="aspect-3/4 w-full overflow-hidden rounded-md bg-stone-200">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-col flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-stone-900 group-hover:text-amber-700 truncate">{book.title}</h3>
                  <p className="mt-1 text-xs text-stone-500 truncate">{book.author}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-stone-500 col-span-full">Start adding books to your dashboard to see recommendations!</p>
          )}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reading Challenge */}
        <div className="lg:col-span-2 bg-amber-50 rounded-2xl p-8 border border-amber-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 font-serif">Reading Challenge {new Date().getFullYear()}</h2>
              <p className="text-stone-600 mt-2">
                {goal > 0
                  ? progressPercent >= 100 ? "Congratulations! You've reached your goal!" : "You're on track! Keep reading to reach your goal."
                  : "Set an annual reading goal to track your progress!"}
              </p>
            </div>
            <GoalSetter currentGoal={goal} onUpdate={() => checkUserLoggedIn()} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-amber-900">
              <span>Overall Progress</span>
              <span>{readCount} / {goal} Books</span>
            </div>
            <div className="w-full bg-white rounded-full h-4 overflow-hidden border border-amber-200 shadow-inner">
              <div
                className="bg-amber-600 h-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-6 font-serif">Community Activity</h2>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
