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
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Phone className="w-4 h-4" /> AI Workforce
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">AI Receptionist</h1>
                        <p className="text-gray-500 text-lg font-medium">24/7 Lead Capture & Appointment Booking for your business.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white border border-gray-200 text-gray-900 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-sm transition-all active:scale-95">
                            <Save className="w-5 h-5" /> Save Configuration
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Configuration Panel */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                Live & Active
                            </span>
                        </div>

                        <h2 className="text-2xl font-black tracking-tight mb-8">Agent Configuration</h2>

                        <form className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Business Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="e.g. Lumiere Coffee Co."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Greeting Message</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold h-32 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    defaultValue="Hi! Thanks for calling Lumiere Coffee. How can I help you book your next visit?"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Calendar Integration</label>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer">
                                    <option>Google Calendar</option>
                                    <option>Outlook (Microsoft 365)</option>
                                    <option>Calendly Integration</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold text-gray-500">Syncing with CRM...</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Live Preview & Leads */}
                    <div className="space-y-10">
                        {/* Chat Preview */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex flex-col h-[500px]">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black tracking-tight">Live Agent Preview</h2>
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-[2rem] p-6 overflow-y-auto space-y-6 border border-gray-100">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] rounded-[1.5rem] px-6 py-4 text-sm font-medium shadow-sm ${msg.role === 'agent'
                                                ? 'bg-white text-gray-900 rounded-tl-none border border-gray-100'
                                                : 'bg-blue-600 text-white rounded-tr-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-start">
                                    <div className="px-6 py-3 bg-white text-gray-400 rounded-full text-xs font-black uppercase tracking-widest border border-gray-100 animate-pulse">
                                        Agent is typing...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leads Dashboard */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black tracking-tight">Recent Captured Leads</h2>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'John Doe', time: 'Tomorrow, 2 PM', initials: 'JD' },
                                    { name: 'Jane Smith', time: 'Wednesday, 10 AM', initials: 'JS' }
                                ].map((lead, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                                                {lead.initials}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 tracking-tight">{lead.name}</p>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Booking: {lead.time}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">Confirmed</span>
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
