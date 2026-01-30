"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Settings, Save, Lock, Palette, Bell, Building } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="Platform Settings"
                    description="Configure your agency profile and integrations"
                    icon={Settings}
                    status="active" // Reusing component but status style might be irrelevant here, keeping for consistency
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Agency Profile */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-400" />
                            Agency Profile
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Agency Name</label>
                                <input type="text" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="OCC Catalyst" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
                                <input type="email" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="support@occ-catalyst.com" />
                            </div>
                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Agency Logo URL</label>
                                <div className="flex gap-2">
                                    <input type="text" className="flex-1 bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
                                    <button type="button" className="bg-gray-800 hover:bg-gray-700 px-4 rounded-lg font-medium transition-colors">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* API Configuration */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-emerald-400" />
                            API Integrations
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">OpenAI API Key</label>
                                <input type="password" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="sk-..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Anthropic API Key</label>
                                <input type="password" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="sk-ant-..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Google Places Key</label>
                                <input type="password" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="AIzb..." />
                            </div>
                        </form>
                    </div>

                    {/* White Labeling */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-purple-400" />
                            White Labeling
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" className="h-10 w-20 bg-transparent border-0 cursor-pointer" defaultValue="#3b82f6" />
                                    <span className="text-gray-400 text-sm">#3b82f6</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-white">Remove "Powered by Snapshot"</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-amber-400" />
                            Notifications
                        </h2>
                        <div className="space-y-4">
                            {['New Lead Alert', 'Review Posted', 'Audit Complete', 'Weekly Report'].map((item) => (
                                <div key={item} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-300">{item}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                </div>

            </main>
        </div>
    );
}
