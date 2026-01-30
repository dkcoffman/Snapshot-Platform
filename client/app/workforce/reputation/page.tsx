"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Star, MessageCircle, CheckCircle, XCircle, ThumbsUp, Shield } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="AI Reputation Specialist"
                    description="Automated Review Monitoring & Response"
                    icon={Star}
                />

                {/* Control Panel */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Human-in-the-loop Mode</h3>
                            <p className="text-sm text-gray-400">Require approval before posting responses</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={autoPost} onChange={() => setAutoPost(!autoPost)} />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-300">{autoPost ? 'Auto-Post ON' : 'Auto-Post OFF'}</span>
                    </label>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-gray-400" />
                        Pending Reviews
                    </h2>

                    {reviews.filter(r => r.status === 'pending').length === 0 && (
                        <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-gray-800 border-dashed">
                            <p className="text-gray-500">No pending reviews to review. Great job!</p>
                        </div>
                    )}

                    {reviews.filter(r => r.status === 'pending').map(review => (
                        <div key={review.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{review.user}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${review.platform === 'Google' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {review.platform}
                                            </span>
                                            <span>•</span>
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 pl-14 font-medium">"{review.text}"</p>

                            <div className="ml-14 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                                        <SparklesIcon className="w-3 h-3" /> AI Suggested Response
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{review.aiResponse}</p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAction(review.id, 'approved')}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Approve & Post
                                    </button>
                                    <button
                                        onClick={() => handleAction(review.id, 'rejected')}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <XCircle className="w-4 h-4" /> Reject
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

function SparklesIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    )
}
