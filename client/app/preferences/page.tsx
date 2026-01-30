"use client";

import React, { useState } from 'react';
import { ShieldCheck, Mail, Bell, Globe, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

export default function PreferenceCenter() {
    const [saved, setSaved] = useState(false);
    const [preferences, setPreferences] = useState({
        marketing: true,
        product: true,
        newsletter: true,
        security: true
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">

            <div className="max-w-2xl w-full bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Header */}
                <div className="bg-gray-800/50 p-8 border-b border-gray-800 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Subscription Preferences</h1>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Manage how we communicate with you. Your data is handled in accordance with **GDPR, CASL, and PECR** regulations.
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-2 mb-8 p-3 bg-gray-950 border border-gray-800 rounded-xl">
                        <span className="text-xs font-medium text-gray-500">Logged in as:</span>
                        <span className="text-xs font-bold text-blue-400 underline decoration-blue-500/30 cursor-pointer">john.doe@example.com</span>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: 'newsletter', title: 'Monthly Newsletter', desc: 'Industry insights, platform updates, and curated AI news.', icon: Globe },
                            { id: 'marketing', title: 'Marketing & Promotions', desc: 'Special offers, new product launches, and exclusive deals.', icon: Bell },
                            { id: 'product', title: 'Product Updates', desc: 'New feature release notes and technical improvements.', icon: CheckCircle2 },
                            { id: 'security', title: 'Security & Legal', desc: 'Mandatory system alerts and policy updates. (Non-optional)', icon: ShieldCheck, locked: true },
                        ].map((item) => (
                            <div key={item.id} className={`flex items-start justify-between p-4 rounded-2xl border transition-all ${item.locked ? 'bg-gray-800/20 border-gray-800' : 'bg-gray-950 border-gray-800 hover:border-gray-700 group'}`}>
                                <div className="flex gap-4">
                                    <div className={`mt-1 p-2 rounded-lg ${item.locked ? 'bg-gray-800 text-gray-500' : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all'}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white flex items-center gap-2">
                                            {item.title}
                                            {item.locked && <span className="text-[10px] font-bold bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full border border-gray-700 uppercase">Mandatory</span>}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                                {!item.locked && (
                                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked
                                            onChange={() => setPreferences(prev => ({ ...prev, [item.id as keyof typeof preferences]: !prev[item.id as keyof typeof preferences] }))}
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-800 flex items-center justify-between">
                        <button className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 group">
                            <XCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Unsubscribe from all communications
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 bg-white text-gray-950 font-black rounded-xl hover:bg-gray-100 transition-all shadow-xl active:scale-95 flex items-center gap-2"
                        >
                            {saved ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Preferences Saved
                                </>
                            ) : (
                                <>
                                    Update Preferences
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="p-8 pt-4">
                    <div className="p-4 bg-gray-950 border border-gray-800 rounded-2xl flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">
                            **Privacy Compliance**: We use industry-standard encryption to protect your data. Your preferences are stored securely and updated across all our platforms within 24 hours.
                            By saving, you agree to our <span className="text-blue-400 underline cursor-pointer">Privacy Policy</span> and <span className="text-blue-400 underline cursor-pointer">Terms of Service</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
