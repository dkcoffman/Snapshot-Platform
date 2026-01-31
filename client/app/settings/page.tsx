"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Settings, Save, Lock, Palette, Bell, Building, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Settings className="w-4 h-4" /> Global Control
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Platform Settings</h1>
                        <p className="text-gray-500 text-lg font-medium">Configure your agency identity, AI workforce permissions, and white-label tools.</p>
                    </div>
                    <button className="bg-gray-900 text-white hover:bg-blue-600 px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-gray-200 flex items-center gap-3 transition-all active:scale-95">
                        <Save className="w-6 h-6" /> Save All Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Agency Profile */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <Building className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-gray-900">Agency Identity</h2>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Agency Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" defaultValue="OCC Catalyst" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Support Email</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" defaultValue="support@occ-catalyst.com" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Agency Logo URL</label>
                                <div className="flex gap-4">
                                    <input type="text" className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="https://..." />
                                    <button type="button" className="bg-white border border-gray-200 text-gray-900 hover:border-blue-600 hover:text-blue-600 px-6 rounded-2xl font-black transition-all">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* API Configuration */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-gray-900">AI Intelligence Core</h2>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">OpenAI Management Key</label>
                                <input type="password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="sk-..." />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Anthropic (Claude 3.5) Key</label>
                                <input type="password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="sk-ant-..." />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Google Maps / Places API</label>
                                <input type="password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="AIzb..." />
                            </div>
                        </form>
                    </div>

                    {/* White Labeling */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                <Palette className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-gray-900">Marketplace Branding</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Primary Platform Color</label>
                                <div className="flex items-center gap-6">
                                    <input type="color" className="h-14 w-24 bg-white border border-gray-100 rounded-2xl p-1 cursor-pointer shadow-sm" defaultValue="#3b82f6" />
                                    <span className="text-lg font-black text-gray-900">#3B82F6</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <div>
                                    <p className="text-sm font-black text-gray-900">Remove "Powered by Snapshot"</p>
                                    <p className="text-xs font-bold text-gray-400 mt-0.5">Full white-label experience for client logins.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                                <Bell className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight text-gray-900">Alert Center Configuration</h2>
                        </div>

                        <div className="space-y-4">
                            {['New Lead Captured', 'Negative Review Alert', 'Audit Performance Update', 'Weekly ROI Summary'].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <span className="text-sm font-bold text-gray-700">{item}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
