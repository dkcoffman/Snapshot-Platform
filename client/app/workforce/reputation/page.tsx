"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Star, MessageCircle, CheckCircle, XCircle, ThumbsUp, Shield, Sparkles } from 'lucide-react';

interface Review {
    id: number;
    user: string;
    rating: number;
    platform: 'Google' | 'Yelp' | 'Facebook';
    text: string;
    date: string;
    aiResponse: string;
    status: 'pending' | 'approved' | 'rejected';
}

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        user: "Sarah Jenkins",
        rating: 5,
        platform: "Google",
        text: "Absolutely loved the service! The team was professional and quick.",
        date: "2 hours ago",
        aiResponse: "Hi Sarah! We're thrilled to hear you had a great experience. Thanks for choosing us!",
        status: 'pending'
    },
    {
        id: 2,
        user: "Mike Ross",
        rating: 4,
        platform: "Yelp",
        text: "Good experience overall, but parking was a bit tricky.",
        date: "5 hours ago",
        aiResponse: "Thanks for the feedback, Mike. We're glad you enjoyed the service and we're working on improving our parking instructions.",
        status: 'pending'
    }
];

export default function ReputationPage() {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [autoPost, setAutoPost] = useState(false);

    const handleAction = (id: number, status: 'approved' | 'rejected') => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Star className="w-4 h-4" /> AI Workforce
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Reputation Specialist</h1>
                        <p className="text-gray-500 text-lg font-medium">Automated Monitoring & Intelligent Review Response Management.</p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 mb-10 flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-3xl bg-blue-50 text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                            <Shield className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-gray-900">Human-in-the-loop Mode</h3>
                            <p className="text-gray-500 font-medium">Require manual approval before AI responses are posted to live directories.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer scale-110">
                        <input type="checkbox" className="sr-only peer" checked={autoPost} onChange={() => setAutoPost(!autoPost)} />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-4 text-sm font-black text-gray-400 uppercase tracking-widest">{autoPost ? 'Auto-Post ON' : 'Auto-Post OFF'}</span>
                    </label>
                </div>

                {/* Reviews List */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                            Pending Review Responses
                        </h2>
                        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {reviews.filter(r => r.status === 'pending').length} Action Required
                        </span>
                    </div>

                    {reviews.filter(r => r.status === 'pending').length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 border-dashed">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-bold text-lg">No pending reviews. Your reputation is spotless!</p>
                        </div>
                    )}

                    {reviews.filter(r => r.status === 'pending').map(review => (
                        <div key={review.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 flex flex-col hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl shadow-sm">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{review.user}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${review.platform === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                {review.platform}
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-xl border border-gray-100">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8 italic">
                                "{review.text}"
                            </p>

                            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">AI Suggested Response</span>
                                </div>
                                <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8">{review.aiResponse}</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleAction(review.id, 'approved')}
                                        className="flex-1 items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200 flex active:scale-95"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Approve & Post
                                    </button>
                                    <button
                                        onClick={() => handleAction(review.id, 'rejected')}
                                        className="px-8 py-4 bg-white text-gray-400 border border-gray-100 rounded-2xl font-black text-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex active:scale-95"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
