"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MOCK_LEADS, Lead } from '@/data/leads';
import { Activity, Mail, Phone, ExternalLink, ArrowUpDown, Filter, Search } from 'lucide-react';

export default function CRMPage() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [filter, setFilter] = useState<'All' | 'New' | 'Contacted' | 'Converted'>('All');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = () => {
        const sorted = [...leads].sort((a, b) => {
            return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
        });
        setLeads(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredLeads = filter === 'All' ? leads : leads.filter(l => l.status === filter);

    const simulateHotLead = () => {
        // Show toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-gray-900 border border-red-500/50 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right z-50';
        toast.innerHTML = `
        <div class="p-2 bg-red-500/20 rounded-full animate-pulse">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
        </div>
        <div>
            <h4 class="font-bold text-red-400">Hot Lead Alert!</h4>
            <p class="text-sm text-gray-300">acme-landscaping.com is viewing their report!</p>
        </div>
    `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-800">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            Sales CRM
                            <span className="text-xs font-medium bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20">Lead Intelligence</span>
                        </h1>
                        <p className="text-gray-400 mt-1">Manage and track your audit leads</p>
                    </div>
                    <button
                        onClick={simulateHotLead}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-500/20 animate-pulse"
                    >
                        🔥 Simulate Visit
                    </button>
                </div>

                {/* Filters and Controls */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
                        {['All', 'New', 'Contacted', 'Converted'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleSort} className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors">
                            <ArrowUpDown className="w-4 h-4" />
                            Sort by Score {sortOrder === 'asc' ? '(Low first)' : '(High first)'}
                        </button>
                    </div>
                </div>

                {/* Lead Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800/50 border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">Business Domain</th>
                                <th className="p-4 font-semibold">Audit Score</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Contact Info</th>
                                <th className="p-4 font-semibold text-right">Last Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors group">
                                    <td className="p-4">
                                        <span className="font-semibold text-white block">{lead.domain}</span>
                                        <a href={`https://${lead.domain}`} target="_blank" className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1">
                                            Visit Site <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${lead.score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                lead.score >= 50 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {lead.score}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                lead.status === 'Contacted' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            {lead.contactInfo.email ? (
                                                <a href={`mailto:${lead.contactInfo.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                    <Mail className="w-4 h-4 text-gray-500" /> {lead.contactInfo.email}
                                                </a>
                                            ) : <span className="text-sm text-gray-600 italic">No email</span>}
                                            {lead.contactInfo.phone ? (
                                                <span className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Phone className="w-4 h-4 text-gray-500" /> {lead.contactInfo.phone}
                                                </span>
                                            ) : null}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right text-sm text-gray-400">
                                        {lead.lastAction}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No leads found matching your filter.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
