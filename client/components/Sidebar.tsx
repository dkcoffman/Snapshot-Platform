"use client";

import Link from "next/link";
import { Activity, LayoutDashboard, Settings, ShoppingBag, Bot, ChevronDown, ChevronRight, Users, PieChart, Briefcase } from "lucide-react";
import React, { useState } from "react";

export function Sidebar() {
    const [isWorkforceOpen, setIsWorkforceOpen] = useState(false);

    return (
        <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-4 fixed left-0 top-0">
            <div className="flex items-center gap-2 mb-10 px-2">
                <Activity className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                    OCC Catalyst
                </span>
            </div>

            <nav className="flex-1 space-y-2">
                <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-xl transition-all hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/10 group">
                    <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Dashboard</span>
                </Link>

                <Link href="/marketplace" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-xl transition-all hover:text-white group">
                    <ShoppingBag className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Marketplace</span>
                </Link>

                <Link href="/crm" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-xl transition-all hover:text-white group">
                    <Users className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Sales CRM</span>
                </Link>

                <Link href="/reports" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-xl transition-all hover:text-white group">
                    <PieChart className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Reports</span>
                </Link>

                <Link href="/partner" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-xl transition-all hover:text-white group">
                    <Briefcase className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Partner Center</span>
                </Link>

                <div>
                    <button
                        onClick={() => setIsWorkforceOpen(!isWorkforceOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <Bot className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium">AI Workforce</span>
                        </div>
                        {isWorkforceOpen ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                    </button>

                    {isWorkforceOpen && (
                        <div className="ml-4 pl-4 border-l border-gray-800 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                            <Link href="/workforce/receptionist" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                Receptionist
                            </Link>
                            <Link href="/workforce/reputation" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                Reputation
                            </Link>
                            <Link href="/workforce/content" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                Content
                            </Link>
                        </div>
                    )}
                </div>

                <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-xl transition-all hover:text-white group">
                    <Settings className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Settings</span>
                </Link>
            </nav>

            <div className="px-4 py-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">v1.0.0 Alpha</p>
            </div>
        </div>
    );
}
