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
            .catch(err => {
                console.error("Failed to load templates:", err);
                // Fallback mock data if server is down
                setTemplates([
                    { id: 1, name: "Flash Sale Elite", category: "Retail", color: "blue", desc: "High-urgency design for seasonal promotions and clearance events." },
                    { id: 2, name: "Executive Insight", category: "B2B", color: "purple", desc: "Professional newsletter layout for agency-to-client intelligence reports." },
                    { id: 3, name: "Review Booster", category: "Reputation", color: "emerald", desc: "Optimized for capturing customer feedback and 5-star directory reviews." },
                ]);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Layout className="w-4 h-4" /> Marketing Library
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Email Templates</h1>
                        <p className="text-gray-500 text-lg font-medium">Choose from our curated library of high-converting templates or start a bespoke build.</p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:w-[500px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search intelligence templates..."
                            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-gray-900"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-3 px-6 py-3 text-xs font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest">
                            <Tags className="w-4 h-4" /> Filter Categories
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl border border-gray-100 transition-all font-black text-sm shadow-sm active:scale-95">
                            Recent Drafts
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Blank Template Option */}
                    <div className="group relative bg-white border-4 border-dashed border-gray-100 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center hover:border-blue-600/30 hover:bg-blue-50/20 transition-all cursor-pointer shadow-sm hover:shadow-xl duration-500">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                            <Plus className="w-10 h-10 text-gray-300 group-hover:text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">Pure Canvas</h3>
                        <p className="text-sm text-gray-400 font-medium mb-8 max-w-[200px] leading-relaxed">Absolute freedom to build your own custom narrative from scratch.</p>
                        <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm opacity-0 group-hover:opacity-100 transition-all shadow-2xl shadow-gray-200 translate-y-4 group-hover:translate-y-0 active:scale-95">
                            Start Building
                        </button>
                    </div>

                    {/* Pre-built Templates */}
                    {templates.map((template) => (
                        <div key={template.id} className="group bg-white border border-gray-100 rounded-[3rem] overflow-hidden hover:border-blue-100 transition-all shadow-sm hover:shadow-2xl flex flex-col duration-500 animate-in fade-in slide-in-from-bottom-8">
                            <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden p-8">
                                {/* Mock Email Preview */}
                                <div className="w-full h-full bg-white rounded-2xl shadow-xl p-6 space-y-4 opacity-80 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-[1.02]">
                                    <div className="w-16 h-3 bg-gray-100 rounded-full mx-auto"></div>
                                    <div className="w-full h-32 bg-gray-50 rounded-3xl border border-gray-100 border-dashed flex items-center justify-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full opacity-50"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-3/4 h-3 bg-gray-100 rounded-full"></div>
                                        <div className="w-full h-3 bg-gray-100 rounded-full"></div>
                                        <div className="w-1/2 h-3 bg-gray-100 rounded-full"></div>
                                    </div>
                                    <div className="w-32 h-12 bg-blue-600/10 rounded-2xl mx-auto mt-6"></div>
                                </div>

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-gray-900/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md duration-500">
                                    <button className="w-48 flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-2xl transform translate-y-4 group-hover:translate-y-0">
                                        <Wand2 className="w-5 h-5" /> Use Template
                                    </button>
                                    <button className="w-48 flex items-center justify-center gap-3 px-8 py-4 bg-white/20 text-white rounded-2xl font-black hover:bg-white/30 transition-all border border-white/20 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 delay-75">
                                        <Eye className="w-5 h-5" /> Preview
                                    </button>
                                </div>

                                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-gray-900 border border-gray-100 shadow-sm">
                                    {template.category}
                                </div>
                            </div>

                            <div className="p-8 pt-4">
                                <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tighter uppercase">{template.name}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">{template.desc}</p>
                                <div className="flex items-center gap-6 pt-6 border-t border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> High Performance</span>
                                    <span className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Featured</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Generation Promo */}
                <div className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.3)] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 transition-all group-hover:bg-white/20 duration-1000"></div>
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-inner shrink-0 rotate-3 group-hover:rotate-6 transition-all border border-white/20">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1 relative z-10">
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tighter leading-tight">AI Narrative Engine™</h3>
                        <p className="text-blue-100 font-medium text-lg max-w-2xl leading-relaxed">
                            Stop guessing. Let our AI build a custom, psychology-backed narrative template based on your active business audit gaps.
                        </p>
                    </div>
                    <button className="px-10 py-5 bg-white text-blue-600 hover:bg-blue-50 font-black rounded-[2rem] transition-all shadow-2xl active:scale-95 flex items-center gap-3 whitespace-nowrap relative z-10 text-lg">
                        Auto-Generate Campaign <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </main>
        </div>
    );
}
