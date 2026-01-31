"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Briefcase, DollarSign, AlertTriangle, UserCheck, TrendingUp, MoreVertical } from 'lucide-react';

export default function PartnerPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Briefcase className="w-4 h-4" /> Administrative
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Partner Intelligence</h1>
                        <p className="text-gray-500 text-lg font-medium">Agency Overview & Revenue Intelligence for your ecosystem.</p>
                    </div>
                </div>

                {/* MRR Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <DollarSign className="w-4 h-4" /> Recurring Revenue
                        </div>
                        <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">$12,450</div>
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-block">+8.2% vs prev</div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <UserCheck className="w-4 h-4" /> Active Clients
                        </div>
                        <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">24</div>
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-block">+2 this month</div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4" /> ARPU
                        </div>
                        <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">$518</div>
                        <div className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full inline-block">Flat tracking</div>
                    </div>
                    <div className="bg-white border border-rose-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all group-hover:bg-rose-500/10"></div>
                        <div className="flex items-center gap-2 mb-4 text-rose-600 text-[10px] font-black uppercase tracking-widest">
                            <AlertTriangle className="w-4 h-4" /> Churn Risk
                        </div>
                        <div className="text-4xl font-black text-rose-600 tracking-tighter mb-1">3</div>
                        <div className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-full inline-block">Action Required</div>
                    </div>
                </div>

                {/* Churn Risk Alerts */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-rose-500 animate-pulse" />
                        Retention Watchlist
                    </h2>
                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { name: 'Lumiere Coffee', risk: 'High', reason: 'No login in 20 days', value: '$450/mo' },
                            { name: 'Apex Roofing', risk: 'Medium', reason: 'Declined performance score', value: '$850/mo' },
                            { name: 'City Yoga', risk: 'Medium', reason: 'Pending invoice (5 days)', value: '$300/mo' },
                        ].map((client, i) => (
                            <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl flex items-center justify-between hover:border-rose-200 transition-all shadow-sm group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-gray-900 tracking-tight transition-colors group-hover:text-rose-600">{client.name}</h4>
                                        <p className="text-sm text-rose-500 font-bold uppercase tracking-widest mt-1">{client.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Portfolio Value</p>
                                        <p className="font-black text-xl text-gray-900 tracking-tight">{client.value}</p>
                                    </div>
                                    <button className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-gray-200">
                                        Contact Client
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Client List */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h2 className="text-2xl font-black tracking-tight text-gray-900">Portfolio Accounts</h2>
                        <button className="text-sm font-black text-blue-600 hover:underline underline-offset-4 uppercase tracking-widest">Global CRM View</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Solutions</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Retention Date</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="font-black text-gray-900 tracking-tight">Acme Global {i}</div>
                                            <div className="text-xs font-bold text-gray-400">acme-corp-{i}.com</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">Healthy</span>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-gray-600 text-sm">SEO + AI Workforce</td>
                                        <td className="px-8 py-6 text-gray-400 font-bold text-xs uppercase">Oct 30, 2024</td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}
