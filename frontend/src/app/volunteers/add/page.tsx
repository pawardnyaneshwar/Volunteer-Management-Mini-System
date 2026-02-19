'use client';

import React, { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddVolunteerPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setError('');
        try {
            await api.post('/volunteers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            router.push('/volunteers');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create volunteer. Please check the form.');
        } finally {
            setIsLoading(false);
        }
    };

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
                <h1 className="text-2xl font-bold text-gray-900">Add New Volunteer</h1>
                <p className="text-gray-500">Enter the details of the new volunteer below.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl overflow-hidden p-8">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <VolunteerForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </Shell>
    );
}
