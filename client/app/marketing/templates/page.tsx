"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import {
    Layout, Plus, Search, Eye,
    ArrowRight, Star, Clock, Tags,
    FileText, Sparkles, Wand2
} from 'lucide-react';

export default function TemplateGallery() {
    const [templates, setTemplates] = useState<any[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5001/api/templates')
            .then(res => res.json())
            .then(data => setTemplates(data))
            .catch(err => console.error("Failed to load templates:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="Email Templates"
                    description="Choose a high-converting template or build your own from scratch."
                    icon={Layout}
                    status="active"
                />

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Find a template..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                            <Tags className="w-4 h-4" /> Categories
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-all font-bold">
                            My Recent
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Blank Template Option */}
                    <div className="group relative bg-gray-950 border-2 border-dashed border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                            <Plus className="w-8 h-8 text-gray-500 group-hover:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Blank Canvas</h3>
                        <p className="text-sm text-gray-500 mb-6">Start from scratch and build your own custom layout.</p>
                        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-blue-500/20">
                            Start Building
                        </button>
                    </div>

                    {/* Pre-built Templates */}
                    {templates.map((template) => (
                        <div key={template.id} className="group bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all shadow-xl hover:shadow-2xl flex flex-col">
                            <div className="aspect-[4/5] bg-gray-950 relative overflow-hidden p-6">
                                {/* Mock Email Preview */}
                                <div className="w-full h-full bg-white rounded-t-lg shadow-sm p-4 space-y-3 opacity-90 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-2 bg-gray-200 rounded-full mx-auto"></div>
                                    <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 border-dashed"></div>
                                    <div className="space-y-2">
                                        <div className="w-3/4 h-3 bg-gray-200 rounded-full"></div>
                                        <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                                        <div className="w-1/2 h-3 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="w-24 h-8 bg-blue-600 rounded-lg mx-auto mt-4"></div>
                                </div>

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-gray-950/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                                    <button className="w-40 flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-gray-950 rounded-xl font-bold hover:bg-gray-100 transition-all">
                                        <Wand2 className="w-4 h-4" /> Use This
                                    </button>
                                    <button className="w-40 flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700">
                                        <Eye className="w-4 h-4" /> Preview
                                    </button>
                                </div>

                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-${template.color}-500/10 text-${template.color}-400 border border-${template.color}-500/20`}>
                                    {template.category}
                                </div>
                            </div>

                            <div className="p-6 pt-2">
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{template.name}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">{template.desc}</p>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 Min Build</span>
                                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Featured</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Generation Promo */}
                <div className="mt-12 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-transparent border border-purple-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                    <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0 rotate-3 group-hover:rotate-6 transition-transform">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">AI-Driven Content Creation</h3>
                        <p className="text-sm text-gray-400 max-w-xl">
                            Stuck on ideas? Let our AI generate a custom template and copywriting based on your latest business audit. Perfect for high-conversion sales outreach.
                        </p>
                    </div>
                    <button className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl transition-all shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap">
                        Generate with AI <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </main>
        </div>
    );
}
