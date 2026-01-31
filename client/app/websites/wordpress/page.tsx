"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Layout,
    HardDrive,
    Zap,
    Blocks,
    ExternalLink,
    Settings,
    Plus,
    ChevronRight,
    Search,
    Globe,
    Cpu,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ label, value, subtext, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-${color}-50 text-${color}-600`}>
                Live Trace
            </div>
        </div>
        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">{value}</h4>
        <p className="text-gray-500 text-xs font-medium">{subtext}</p>
    </div>
);

interface WordPressSite {
    name: string;
    url: string;
    status: string;
    theme: string;
    plugins: number;
    storage: string;
    updated: string;
}

export default function WordPressDashboard() {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importUrl, setImportUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);

    const [sites, setSites] = useState<WordPressSite[]>([
        { name: "Lumiere Coffee", url: "lumiere-coffee.com", status: "Active", theme: "Astra Pro", plugins: 12, storage: "1.2GB", updated: "2h ago" },
        { name: "Urban Fitness", url: "urbanfit.io", status: "Active", theme: "Elementor Kit", plugins: 8, storage: "850MB", updated: "5h ago" },
        { name: "Law Firm HQ", url: "justice-legal.com", status: "Staging", theme: "Divi Elite", plugins: 15, storage: "2.1GB", updated: "1d ago" },
    ]);

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setAnalysisSteps([]);

        const steps = [
            "Connecting to external server...",
            "Analyzing CSS and Asset structure...",
            "Mapping content architecture...",
            "Preparing redesign environment..."
        ];

        for (let i = 0; i < steps.length; i++) {
            setAnalysisSteps((prev: string[]) => [...prev, steps[i]]);
            await new Promise(r => setTimeout(r, 800));
        }

        setTimeout(() => {
            const newSite = {
                name: importUrl.split('.')[0] || "Imported Site",
                url: importUrl,
                status: "Ready for Redesign",
                theme: "Pending Selection",
                plugins: 0,
                storage: "0MB",
                updated: "Just now"
            };
            setSites((prev: WordPressSite[]) => [newSite, ...prev]);
            setIsAnalyzing(false);
            setIsImportModalOpen(false);
            setImportUrl('');
            setAnalysisSteps([]);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Layout className="w-4 h-4" /> Presence & Hosting
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">WordPress Design</h1>
                        <p className="text-gray-500 text-lg font-medium">Manage enterprise-grade WordPress hosting and custom designs.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="bg-white border border-gray-200 text-gray-900 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-sm transition-all active:scale-95"
                        >
                            <Zap className="w-5 h-5" /> Import Existing Site
                        </button>
                        <Link
                            href="/websites/wordpress/templates"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" /> New Design Project
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <StatCard label="Disk Usage" value="14.2 GB" subtext="85% of 20GB limit" icon={HardDrive} color="blue" />
                    <StatCard label="Monthly Traffic" value="84.3k" subtext="+12% from last month" icon={Globe} color="emerald" />
                    <StatCard label="Server CPU" value="4.2%" subtext="Optimized Performance" icon={Cpu} color="purple" />
                    <StatCard label="Active Plugins" value="35" subtext="Across 3 active sites" icon={Blocks} color="orange" />
                </div>

                {/* Project List */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                            Managed Websites
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{sites.length} Active</span>
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="bg-white border border-gray-200 rounded-xl px-10 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Site Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Design Theme</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Storage</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {sites.map((site: WordPressSite, idx: number) => (
                                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <a
                                                href={`https://${site.url}/wp-admin`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:opacity-75 transition-opacity block"
                                            >
                                                <p className="font-black text-gray-900 tracking-tight">{site.name}</p>
                                                <p className="text-xs font-bold text-gray-400">{site.url}</p>
                                            </a>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${site.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                                    site.status === 'Ready for Redesign' ? 'bg-purple-50 text-purple-600' :
                                                        'bg-blue-50 text-blue-600'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${site.status === 'Active' ? 'bg-emerald-500' :
                                                        site.status === 'Ready for Redesign' ? 'bg-purple-500' :
                                                            'bg-blue-500'
                                                    }`}></div>
                                                {site.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Link href="/websites/wordpress/templates">
                                                <div className="flex items-center gap-2 hover:bg-gray-100 p-2 -m-2 rounded-xl transition-all cursor-pointer">
                                                    <div className="p-1.5 bg-gray-100 rounded-lg">
                                                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700">{site.theme}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-gray-900">{site.storage}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={`https://${site.url}/wp-admin`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-black shadow-lg shadow-gray-200 hover:bg-blue-600 transition-all"
                                                >
                                                    Edit Site <ChevronRight className="w-3.5 h-3.5" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Import Modal */}
                {isImportModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                            <Zap className="w-4 h-4 fill-purple-600" /> Site Redesign Suite
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter text-gray-900">Import for Redesign</h2>
                                        <p className="text-gray-500 font-medium">Enter a URL to analyze and import its current structure.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsImportModalOpen(false)}
                                        className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <ChevronRight className="w-6 h-6 rotate-180" />
                                    </button>
                                </div>

                                {isAnalyzing ? (
                                    <div className="py-12 flex flex-col items-center">
                                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                                        <div className="w-full space-y-4 max-w-sm">
                                            {analysisSteps.map((step: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 animate-in slide-in-from-bottom-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-sm font-bold text-gray-700">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleImport}>
                                        <div className="mb-8">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Company Website URL</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. delicious-donuts.com"
                                                    value={importUrl}
                                                    onChange={(e) => setImportUrl(e.target.value)}
                                                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-lg"
                                                    autoFocus
                                                />
                                                <Globe className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!importUrl}
                                            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200 hover:bg-purple-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            Start Import Analysis <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
