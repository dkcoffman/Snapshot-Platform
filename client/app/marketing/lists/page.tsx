"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import {
    Users, Plus, Search, MoreVertical,
    Mail, Calendar, Download, Trash2,
    Tag, CheckCircle2, AlertCircle, ShieldCheck
} from 'lucide-react';

export default function ContactLists() {
    const [lists, setLists] = useState<any[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5001/api/lists')
            .then(res => res.json())
            .then(data => setLists(data))
            .catch(err => console.error("Failed to load lists:", err));
    }, []);

    const handleCreateList = async () => {
        const name = prompt("Enter list name:");
        if (!name) return;

        const newList = {
            name,
            count: 0
        };

        const res = await fetch('http://localhost:5001/api/lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newList)
        });

        if (res.ok) {
            const savedList = await res.json();
            setLists([savedList, ...lists]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="Audience & Lists"
                    description="Securely manage and segment your marketing contacts and lead lists."
                    icon={Users}
                    status="active"
                />

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search your lists..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                        <Plus className="w-4 h-4" /> Create New List
                    </button>
                </div>

                {/* Compliance Badge */}
                <div className="mb-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Data Security & Compliance Active</h4>
                        <p className="text-xs text-gray-400">All lists are stored in an encrypted database and screened for **CASL/GDPR** compliance before use.</p>
                    </div>
                </div>

                {/* Lists Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-4">List Name</th>
                                <th className="px-6 py-4">Recipients</th>
                                <th className="px-6 py-4">Compliance Status</th>
                                <th className="px-6 py-4">Last Modified</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm">
                            {lists.map((list) => (
                                <tr key={list.id} className="hover:bg-gray-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-950 rounded-lg flex items-center justify-center border border-gray-800 group-hover:border-blue-500/50 transition-colors">
                                                <Tag className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{list.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 font-mono">
                                        <div className="flex items-center gap-2">
                                            {list.count} <span className="text-[10px] font-bold text-gray-600 uppercase">Contacts</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${list.status === 'Active'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                            {list.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            {list.compliance}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{list.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State / Integration Tip */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl text-center">
                    <p className="text-sm text-blue-200">
                        💡 **Power User Tip**: You can automatically populate lists from your **Sales CRM** by clicking "Export to List" on any filtered lead list.
                    </p>
                </div>
            </main>
        </div>
    );
}
