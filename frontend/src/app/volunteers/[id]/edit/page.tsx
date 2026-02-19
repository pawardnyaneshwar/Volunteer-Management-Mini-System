'use client';

import React, { useState, useEffect } from 'react';
import { Shell } from '@/components/layout/Shell';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import api from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditVolunteerPage() {
    const { id } = useParams();
    const [volunteer, setVolunteer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchVolunteer = async () => {
            try {
                const response = await api.get(`/volunteers/${id}`);
                setVolunteer(response.data.data);
            } catch (err) {
                setError('Failed to fetch volunteer data.');
            } finally {
                setFetching(false);
            }
        };
        fetchVolunteer();
    }, [id]);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setError('');
        try {
            // Laravel requires _method=PUT when using multipart/form-data for updates
            formData.append('_method', 'PUT');
            await api.post(`/volunteers/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            router.push('/volunteers');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update volunteer. Please check the form.');
        } finally {
            setIsLoading(false);
        }
    };

    if (fetching) {
        return (
            <Shell>
                <div className="animate-pulse">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                    <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-96 bg-gray-200 rounded mb-8" />
                    <div className="bg-white rounded-xl h-96 w-full" />
                </div>
            </Shell>
        );
    }

    return (
        <Shell>
            <div className="mb-8">
                <Link
                    href="/volunteers"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to list
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Volunteer</h1>
                <p className="text-gray-500">Update the information for this volunteer.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl overflow-hidden p-8">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <VolunteerForm
                    initialData={volunteer}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </Shell>
    );
}
