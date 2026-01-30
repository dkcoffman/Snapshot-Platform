"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    Users,
    Star,
    PenTool,
    CheckCircle2,
    ChevronRight,
    Download,
    Calendar,
    Sparkles,
    Target,
    Zap
} from 'lucide-react';

export default function ExecutiveReport() {
    const [period, setPeriod] = useState('Oct 1 - Oct 31, 2024');

    const OutcomeCard = ({ title, value, change, icon: Icon, color }: any) => (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600 shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black ${change > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                    {change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900 tracking-tight">{value}</span>
                <span className="text-gray-400 text-xs font-medium">New this month</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Target className="w-4 h-4" /> Proof of Performance
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Executive Report</h1>
                        <p className="text-gray-500 text-lg font-medium">Monthly outcome summary for <span className="text-gray-900 font-bold">Lumiere Coffee Co.</span></p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-2 shadow-sm">
                            <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                            <select className="bg-transparent text-sm font-bold pr-4 outline-none border-none focus:ring-0">
                                <option>October 2024</option>
                                <option>September 2024</option>
                                <option>August 2024</option>
                            </select>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>

                {/* AI Summary Block - Vendasta Signature */}
                <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-[3rem] p-10 mb-12 shadow-2xl shadow-blue-500/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-white/15"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0 border border-white/30 rotate-3 shadow-lg group-hover:rotate-6 transition-transform">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white text-2xl font-black mb-4 flex items-center gap-3">
                                Monthly AI Insights
                                <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full border border-white/20 uppercase">Pro Performance</span>
                            </h2>
                            <p className="text-blue-50 text-xl font-medium leading-relaxed max-w-4xl">
                                "This month, your digital presence saw a <span className="text-white font-black underline decoration-blue-400 underline-offset-4 decoration-4">24% improvement</span>. Our AI workforce successfully captured <span className="text-white font-black">18 qualified leads</span> while your storefront was closed and automated the resolution of <span className="text-white font-black">4 negative reviews</span>, preserving your 4.8-star reputation. Your visibility in local search is at an all-time high."
                            </p>
                        </div>
                    </div>
                </div>

                {/* ROI / Outcome Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <OutcomeCard title="Leads Captured" value="48" change={12} icon={Target} color="blue" />
                    <OutcomeCard title="Reviews Managed" value="124" change={8} icon={Star} color="emerald" />
                    <OutcomeCard title="Content Published" value="12" change={20} icon={PenTool} color="purple" />
                    <OutcomeCard title="Client Activity" value="3.2k" change={-5} icon={Activity} color="orange" />
                </div>

                {/* Progression Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight mb-1 font-heading">Digital Health Progression</h3>
                                <p className="text-gray-500 font-medium">Snapshot Score improvement over the last 6 months</p>
                            </div>
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                <button className="px-4 py-2 text-xs font-bold text-gray-900 bg-white rounded-lg shadow-sm">6 Months</button>
                                <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">12 Months</button>
                            </div>
                        </div>

                        {/* Mock Chart Visualization */}
                        <div className="h-64 flex items-end gap-6 mb-8 mt-12 px-4">
                            {[
                                { m: 'May', h: '40%', g: 'D' },
                                { m: 'Jun', h: '45%', g: 'D+' },
                                { m: 'Jul', h: '60%', g: 'C' },
                                { m: 'Aug', h: '75%', g: 'B-' },
                                { m: 'Sep', h: '88%', g: 'B+' },
                                { m: 'Oct', h: '96%', g: 'A' },
                            ].map((d, i) => (
                                <div key={d.m} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="relative w-full">
                                        <div
                                            className={`w-full rounded-t-2xl transition-all duration-1000 delay-${i * 100} ${i === 5 ? 'bg-blue-600 shadow-xl shadow-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
                                                }`}
                                            style={{ height: d.h }}
                                        ></div>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
                                            <div className="bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded shadow-xl">
                                                Grade: {d.g}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.m}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <p className="text-sm font-bold text-gray-700">Projected Grade for November: <span className="text-blue-600">A+</span></p>
                            </div>
                            <button className="text-blue-600 text-sm font-black hover:underline underline-offset-4 flex items-center gap-1 group">
                                View Full Audit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10">
                            <Zap className="w-12 h-12 text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            <h3 className="text-3xl font-black mb-4 leading-tight">Your AI Workforce is active</h3>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">Over the last 30 days, your AI employees logged <span className="text-white font-bold">142 hours</span> of active work.</p>

                            <div className="space-y-6">
                                {[
                                    { label: 'AI Receptionist', p: '92%' },
                                    { label: 'Reputation AI', p: '85%' },
                                    { label: 'Content AI', p: '78%' },
                                ].map(ai => (
                                    <div key={ai.label}>
                                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-gray-400">
                                            <span>{ai.label}</span>
                                            <span className="text-white">{ai.p} efficiency</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: ai.p }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="relative z-10 w-full mt-12 py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2">
                            Manage Workforce <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function ArrowRight(props: any) {
    return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
}
