'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, X } from 'lucide-react';
import Link from 'next/link';

interface VolunteerFormProps {
    initialData?: any;
    onSubmit: (data: FormData) => Promise<void>;
    isLoading: boolean;
}

export const VolunteerForm: React.FC<VolunteerFormProps> = ({
    initialData,
    onSubmit,
    isLoading
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country_code: '+91',
        mobile: '',
        status: 'active' as 'active' | 'inactive',
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                country_code: initialData.country_code || '+91',
                mobile: initialData.mobile || '',
                status: initialData.status || 'active',
            });
            if (initialData.profile_image) {
                setPreview(initialData.profile_image);
            }
        }
    }, [initialData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (image) {
            data.append('profile_image', image);
        } else if (initialData && initialData.profile_image && !preview) {
            // Handle case where existing image was removed but no new one selected
            // In a real app, you might send a flag to delete the image
        }

        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
                <span className="block mb-2 text-sm font-medium text-gray-700 w-full text-center">Profile Image</span>
                <div className="relative h-32 w-32 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden group">
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-8 h-8 text-white" />
                            </button>
                        </>
                    ) : (
                        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-xs text-gray-500 mt-2">Upload</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                />
                <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                />
                <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                        <Input
                            label="Code"
                            required
                            value={formData.country_code}
                            onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                            placeholder="+91"
                        />
                    </div>
                    <div className="col-span-3">
                        <Input
                            label="Mobile Number"
                            required
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            placeholder="1234567890"
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                    <select
                        className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <Link href="/volunteers">
                    <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button type="submit" isLoading={isLoading} className="px-8 shadow-md">
                    {initialData ? 'Update Volunteer' : 'Create Volunteer'}
                </Button>
            </div>
        </form>
    );
};
