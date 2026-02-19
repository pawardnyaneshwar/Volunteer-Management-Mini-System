'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Users,
    LogOut,
    Menu,
    X,
    UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Volunteers', href: '/volunteers', icon: Users },
    ];

    const sidebarLinks = (
        <nav className="space-y-1 px-2 pb-4 pt-4">
            {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <item.icon
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                                }`}
                        />
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar for desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col shadow-xl">
                <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r">
                    <div className="flex items-center flex-shrink-0 px-4 mb-8">
                        <span className="text-2xl font-bold text-blue-600">Volunteer Admin</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        {sidebarLinks}
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex-shrink-0 w-full group block text-gray-700">
                            <div className="flex items-center">
                                <div className="inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100">
                                    <UserCircle className="h-full w-full text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate max-w-[120px]">
                                        {user?.name}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-0 h-auto text-xs text-gray-500 hover:text-gray-700 flex items-center"
                                        onClick={() => logout()}
                                    >
                                        Sign out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="flex-1">
                    <div className="py-6 min-h-screen">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 flex z-40 md:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <span className="text-xl font-bold text-blue-600">Volunteer Admin</span>
                            </div>
                            {sidebarLinks}
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <div className="flex-shrink-0 group block">
                                <div className="flex items-center">
                                    <UserCircle className="h-9 w-9 text-gray-400" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                        <button
                                            onClick={() => logout()}
                                            className="text-xs font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
