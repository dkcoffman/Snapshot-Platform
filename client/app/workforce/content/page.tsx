"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { PenTool, Calendar, Wand2, Instagram, Facebook, Share2, Sparkles, AlertCircle } from 'lucide-react';

interface ContentPost {
    id: number;
    date: string;
    platform: 'Instagram' | 'Facebook' | 'LinkedIn';
    content: string;
    type: 'Educational' | 'Promotional' | 'Engagement';
    status: 'draft' | 'scheduled';
}

export default function ContentPage() {
    const [posts, setPosts] = useState<ContentPost[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePlan = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setPosts([
                { id: 1, date: 'Oct 24', platform: 'Instagram', content: 'Did you know? Consistent SEO updates can increase traffic by 40%. #MarketingTips', type: 'Educational', status: 'scheduled' },
                { id: 2, date: 'Oct 26', platform: 'Facebook', content: 'Client Spotlight: See how we helped Acme Corp double their leads in 30 days.', type: 'Promotional', status: 'draft' },
                { id: 3, date: 'Oct 28', platform: 'LinkedIn', content: 'What’s the biggest challenge you face with digital marketing? Let us know in the comments!', type: 'Engagement', status: 'draft' },
                { id: 4, date: 'Oct 30', platform: 'Instagram', content: 'Behind the scenes at our office today! 📸', type: 'Engagement', status: 'draft' },
            ]);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <PenTool className="w-4 h-4" /> AI Workforce
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Content Strategy</h1>
                        <p className="text-gray-500 text-lg font-medium">Auto-generate brand-aligned social content and multi-channel marketing plans.</p>
                    </div>
                    <button
                        onClick={generatePlan}
                        disabled={isGenerating || posts.length > 0}
                        className="bg-gray-900 text-white hover:bg-blue-600 px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-gray-200 flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isGenerating ? (
                            <><Wand2 className="w-6 h-6 animate-spin" /> Analyzing Narrative...</>
                        ) : (
                            <><Wand2 className="w-6 h-6" /> Generate Monthly Plan</>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Insights Panel */}
                    <div className="col-span-1 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 group">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black tracking-tight">AI Audit Insights</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl group-hover:bg-rose-100/50 transition-colors">
                                    <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-widest mb-2">
                                        <AlertCircle className="w-3 h-3" /> Critical Gap
                                    </div>
                                    <h3 className="text-gray-900 font-black text-sm mb-1">Missing Instagram Presence</h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">No linked IG account detected. You are currently missing out on ~40% of local digital engagement.</p>
                                </div>

                                <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl group-hover:bg-amber-100/50 transition-colors">
                                    <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest mb-2">
                                        <AlertCircle className="w-3 h-3" /> Consistency Alert
                                    </div>
                                    <h3 className="text-gray-900 font-black text-sm mb-1">Low Frequency</h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">Last Facebook post was 84 days ago. Industry standard for your category is 2-3x weekly.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-white/20"></div>
                            <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">Sync directly to Business App</h3>
                            <p className="text-blue-100 font-medium mb-8 relative z-10">Automatically push scheduled posts to your GMB, Facebook, and Instagram profiles.</p>
                            <button className="bg-white text-blue-600 w-full py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all relative z-10">
                                Configure Auto-Sync
                            </button>
                        </div>
                    </div>

                    {/* Calendar / Feed */}
                    <div className="col-span-2">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-gray-400" />
                                Upcoming Content Calendar
                            </h2>
                            {posts.length > 0 && (
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                    October 2024
                                </span>
                            )}
                        </div>

                        {posts.length === 0 ? (
                            <div className="h-[600px] bg-white border border-gray-100 border-dashed rounded-[3rem] shadow-sm flex flex-col items-center justify-center text-gray-400 p-12 text-center">
                                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                                    <Share2 className="w-16 h-16 opacity-10" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No Content Planned</h3>
                                <p className="text-gray-500 font-medium max-w-sm">Click the generate button above to let AI analyze your audit gaps and build a 30-day strategy.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                {posts.map(post => (
                                    <div key={post.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                                                    {post.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                                                    {post.platform === 'Facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                                                    {post.platform === 'LinkedIn' && <Share2 className="w-5 h-5 text-sky-600" />}
                                                </div>
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{post.date}</span>
                                            </div>
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${post.status === 'scheduled' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-500'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-medium text-lg leading-relaxed mb-8 line-clamp-4 italic border-l-4 border-gray-50 pl-6 group-hover:border-blue-100 transition-all">
                                            "{post.content}"
                                        </p>
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">{post.type}</span>
                                            <button className="text-sm font-black text-blue-600 hover:underline underline-offset-4">Edit Narrative</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
