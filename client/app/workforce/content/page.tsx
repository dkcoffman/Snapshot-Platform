"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { PenTool, Calendar, Wand2, Instagram, Facebook, Share2 } from 'lucide-react';

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
        // Simulate AI generation delay
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
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="AI Content Assistant"
                    description="Auto-generate brand-aligned social content"
                    icon={PenTool}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Insights Panel */}
                    <div className="col-span-1 space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-4 text-white">Snapshot Insights</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <h3 className="text-red-400 text-sm font-bold mb-1">Critical Gap</h3>
                                    <p className="text-gray-400 text-sm">No Instagram presence detected. You're missing 40% of local engagement.</p>
                                </div>
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <h3 className="text-amber-400 text-sm font-bold mb-1">Consistency Alert</h3>
                                    <p className="text-gray-400 text-sm">Last Facebook post was 3 months ago. Recommended frequency: 2x/week.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={generatePlan}
                            disabled={isGenerating || posts.length > 0}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <Wand2 className="w-5 h-5 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" /> Generate Monthly Plan
                                </>
                            )}
                        </button>
                    </div>

                    {/* Calendar / Feed */}
                    <div className="col-span-2">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            Upcoming Content
                        </h2>

                        {posts.length === 0 ? (
                            <div className="h-64 bg-gray-900/50 border border-gray-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-gray-500">
                                <Share2 className="w-12 h-12 mb-4 opacity-20" />
                                <p>No content scheduled. Click generate to start.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {posts.map(post => (
                                    <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                {post.platform === 'Instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
                                                {post.platform === 'Facebook' && <Facebook className="w-4 h-4 text-blue-500" />}
                                                {post.platform === 'LinkedIn' && <Share2 className="w-4 h-4 text-blue-400" />}
                                                <span className="text-sm font-medium text-gray-300">{post.date}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${post.status === 'scheduled' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                                {post.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{post.type}</span>
                                            <button className="text-sm text-blue-400 hover:text-white transition-colors">Edit</button>
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
