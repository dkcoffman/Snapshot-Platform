"use client";

import React, { useState } from 'react';
import { ShieldCheck, Mail, Bell, Globe, CheckCircle2, ChevronRight, XCircle, Shield } from 'lucide-react';

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
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.05),_transparent)] font-sans">
            <div className="max-w-2xl w-full bg-white border border-gray-100 rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Header */}
                <div className="bg-gray-50/50 p-10 border-b border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Communication Settings</h1>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Control how you receive updates. Our systems are fully compliant with <span className="text-gray-900 font-bold">GDPR, CASL, and PECR</span> data protection standards.
                    </p>
                </div>

                {/* Content */}
                <div className="p-10">
                    <div className="flex items-center gap-3 mb-10 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Account</span>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-sm font-black text-blue-600 underline decoration-blue-200 underline-offset-4 cursor-pointer">john.doe@example.com</span>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: 'newsletter', title: 'Monthly Intelligence', desc: 'Strategy insights, ecosystem updates, and curated AI-assisted marketing news.', icon: Globe },
                            { id: 'marketing', title: 'Promotions & Offers', desc: 'Exclusive partner deals, new product launches, and tiered subscription offers.', icon: Bell },
                            { id: 'product', title: 'Feature Announcements', desc: 'Technical release notes, workforce improvements, and dashboard refinements.', icon: CheckCircle2 },
                            { id: 'security', title: 'Security & System Alerts', desc: 'Critical platform maintenance and mandatory policy updates. (Non-optional)', icon: ShieldCheck, locked: true },
                        ].map((item) => (
                            <div key={item.id} className={`flex items-start justify-between p-6 rounded-3xl border transition-all duration-300 ${item.locked ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md group'
                                }`}>
                                <div className="flex gap-5">
                                    <div className={`mt-1 p-3 rounded-xl transition-all ${item.locked ? 'bg-gray-200 text-gray-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200'
                                        }`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                                            {item.title}
                                            {item.locked && <span className="text-[10px] font-black bg-gray-200 text-gray-500 px-3 py-1 rounded-full border border-gray-300 uppercase tracking-widest">Mandatory</span>}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                                    </div>
                                </div>
                                {!item.locked && (
                                    <label className="relative inline-flex items-center cursor-pointer mt-2">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked
                                            onChange={() => setPreferences(prev => ({ ...prev, [item.id as keyof typeof preferences]: !prev[item.id as keyof typeof preferences] }))}
                                        />
                                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-10 border-t border-gray-50 flex items-center justify-between">
                        <button className="text-[10px] font-black text-rose-400 hover:text-rose-600 transition-all uppercase tracking-widest flex items-center gap-2 group">
                            <XCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Unsubscribe from all communications
                        </button>
                        <button
                            onClick={handleSave}
                            className={`px-10 py-4 font-black rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-3 ${saved ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200'
                                }`}
                        >
                            {saved ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Preferences Saved
                                </>
                            ) : (
                                <>
                                    Update Settings
                                    <ChevronRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex gap-5 items-start">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                            <Shield className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-[0.05em]">
                            **Privacy Governance**: Your preferences are encrypted during transit and handled in compliance with global standards.
                            Updating your profile here synchronizes across all <span className="text-gray-600">OCC Catalyst</span> partner networks within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
