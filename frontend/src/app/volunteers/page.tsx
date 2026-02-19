'use client';

import React, { useEffect, useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ToggleLeft,
    ToggleRight,
    ChevronLeft,
    ChevronRight,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';

interface Volunteer {
    id: number;
    name: string;
    email: string;
    country_code: string;
    mobile: string;
    profile_image: string | null;
    status: 'active' | 'inactive';
    created_at: string;
}

export default function VolunteerListPage() {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);

    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/volunteers', {
                params: { search, status, page }
            });
            setVolunteers(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error('Failed to fetch volunteers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVolunteers();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, status, page]);

    const toggleStatus = async (id: number) => {
        try {
            await api.post(`/volunteers/${id}/toggle-status`);
            fetchVolunteers();
        } catch (error) {
            console.error('Failed to toggle status', error);
        }
    };

    const deleteVolunteer = async (id: number) => {
        if (confirm('Are you sure you want to delete this volunteer?')) {
            try {
                await api.delete(`/volunteers/${id}`);
                fetchVolunteers();
            } catch (error) {
                console.error('Failed to delete volunteer', error);
            }
        }
    };

    return (
        <Shell>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
                    <p className="text-gray-500">Manage your volunteer directory</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link href="/volunteers/add">
                        <Button className="flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Volunteer
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            className="pl-10"
                            placeholder="Search by name, email or mobile..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Volunteer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && volunteers.length === 0 ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 bg-gray-100 rounded-full mr-3" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-32 bg-gray-100 rounded" />
                                                    <div className="h-3 w-24 bg-gray-100 rounded" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-24 bg-gray-100 rounded" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-6 w-16 bg-gray-100 rounded-full" />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="h-8 w-8 bg-gray-100 rounded ml-auto" />
                                        </td>
                                    </tr>
                                ))
                            ) : volunteers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                                        No volunteers found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                volunteers.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                                    {v.profile_image ? (
                                                        <img src={v.profile_image} alt={v.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        v.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                                                    <p className="text-xs text-gray-500">{v.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-700">
                                                {v.country_code} {v.mobile}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${v.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => toggleStatus(v.id)}
                                                    className={`p-1.5 rounded-lg transition-colors ${v.status === 'active' ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                                                        }`}
                                                    title="Toggle Status"
                                                >
                                                    {v.status === 'active' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                                </button>
                                                <Link href={`/volunteers/${v.id}/edit`}>
                                                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => deleteVolunteer(v.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta && meta.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing page {meta.current_page} of {meta.last_page}
                        </p>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={meta.current_page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={meta.current_page === meta.last_page}
                                onClick={() => setPage(page + 1)}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Shell>
    );
}
