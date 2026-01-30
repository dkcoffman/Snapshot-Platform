"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Phone, Calendar, MessageSquare, Save, User } from 'lucide-react';

export default function ReceptionistPage() {
    const [messages, setMessages] = useState([
        { role: 'agent', text: 'Hi! Thanks for calling OCC. How can I help you today?' },
        { role: 'user', text: 'I need to book a consultation.' },
        { role: 'agent', text: 'I can help with that. What is your name?' },
    ]);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="AI Receptionist"
                    description="24/7 Lead Capture & Appointment Booking"
                    icon={Phone}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Configuration Panel */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            Configuration
                        </h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Business Name</label>
                                <input type="text" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Acme Corp" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Greeting Message</label>
                                <textarea className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white h-24 focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="Hi! Thanks for calling. How can I help you?" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Calendar Integration</label>
                                <select className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>Google Calendar</option>
                                    <option>Outlook</option>
                                    <option>Calendly</option>
                                </select>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                <Save className="w-4 h-4" /> Save Settings
                            </button>
                        </form>
                    </div>

                    {/* Live Preview / Lead Dashboard */}
                    <div className="space-y-8">
                        {/* Chat Preview */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-emerald-400" />
                                Live Preview
                            </h2>

                            <div className="bg-gray-950 rounded-xl border border-gray-800 p-4 h-96 flex flex-col">
                                <div className="flex-1 space-y-4">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'agent'
                                                    ? 'bg-gray-800 text-gray-200 rounded-tl-none'
                                                    : 'bg-blue-600 text-white rounded-tr-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-gray-800 text-gray-200 rounded-tl-none animate-pulse">
                                            Typing...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Leads */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-purple-400" />
                                Recent Leads
                            </h2>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">JD</div>
                                            <div>
                                                <p className="text-sm font-medium text-white">John Doe</p>
                                                <p className="text-xs text-gray-400">Booking: Tomorrow, 2 PM</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Confirmed</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
