"use client";

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiFlag } from 'react-icons/hi';

export default function GoalSetter({ currentGoal, onUpdate }) {
    const [goal, setGoal] = useState(currentGoal || 0);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/users/goal', { goal });
            toast.success('Reading goal updated!');
            setIsEditing(false);
            if (onUpdate) onUpdate(goal);
        } catch (error) {
            toast.error('Failed to update goal');
        }
    };

    if (!isEditing) {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium flex items-center"
            >
                <HiFlag className="mr-1 h-4 w-4" />
                {currentGoal > 0 ? `Update Goal (${currentGoal})` : 'Set a Reading Goal'}
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="number"
                min="1"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-20 px-2 py-1 text-sm border border-amber-300 rounded focus:ring-amber-500 focus:border-amber-500"
                placeholder="Goal"
                required
            />
            <button
                type="submit"
                className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition-colors"
            >
                Save
            </button>
            <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-stone-500 text-sm hover:text-stone-700"
            >
                Cancel
            </button>
        </form>
    );
}
