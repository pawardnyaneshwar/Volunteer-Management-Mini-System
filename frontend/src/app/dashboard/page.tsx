'use client';

import React, { useEffect, useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import api from '@/lib/api';
import { Users, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface Stats {
    total: number;
    active: number;
    inactive: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/volunteers/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Volunteers', value: stats?.total ?? 0, icon: Users, colorClass: 'bg-blue-500', textClass: 'text-blue-600' },
        { name: 'Active Volunteers', value: stats?.active ?? 0, icon: CheckCircle, colorClass: 'bg-green-500', textClass: 'text-green-600' },
        { name: 'Inactive Volunteers', value: stats?.inactive ?? 0, icon: XCircle, colorClass: 'bg-red-500', textClass: 'text-red-600' },
        { name: 'New This Month', value: '+12', icon: TrendingUp, colorClass: 'bg-purple-500', textClass: 'text-purple-600' },
    ];

    return (
        <Shell>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card) => (
                    <div key={card.name} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${card.colorClass} bg-opacity-10 mr-4`}>
                                <card.icon className={`h-6 w-6 ${card.textClass}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 truncate">{card.name}</p>
                                {loading ? (
                                    <div className="h-7 w-12 bg-gray-100 animate-pulse rounded mt-1" />
                                ) : (
                                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Volunteer Distribution</h3>
                    <div className="h-48 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-lg">
                        Distribution Chart Placeholder
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Registrations</h3>
                    <div className="h-48 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-lg">
                        Recent Activity List Placeholder
                    </div>
                </div>
            </div>
        </Shell>
    );
}
