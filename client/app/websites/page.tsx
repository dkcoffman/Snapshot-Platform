"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Globe,
    Mail,
    Phone,
    Calendar,
    ExternalLink,
    Trash2,
    Search,
    ChevronRight,
    ChevronDown,
    TrendingUp,
    MoreHorizontal,
    X,
    MapPin,
    Sparkles,
    Zap,
    Plus
} from 'lucide-react';

export default function WebsitesPage() {
    const [snapshots, setSnapshots] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [leadCategory, setLeadCategory] = useState('');
    const [isSearchingLeads, setIsSearchingLeads] = useState(false);
    const [foundLeads, setFoundLeads] = useState<any[]>([]);

    useEffect(() => {
        fetchSnapshots();
    }, []);

    const fetchSnapshots = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5001/api/snapshots');
            const data = await res.json();
            setSnapshots(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch snapshots:', err);
            setSnapshots([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchLeads = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearchingLeads(true);
        // Mocking categorical prospecting logic
        setTimeout(() => {
            const mocks = [
                { name: "Joe's Coffee Shack", address: "123 Main St", rating: 3.2, category: leadCategory || "Cafe", url: "joesshack.com", impact: "High" },
                { name: "The Beanery", address: "456 Oak Ave", rating: 4.5, category: leadCategory || "Cafe", url: "thebeanery.net", impact: "Medium" },
                { name: "Urban Brew", address: "789 Pine Rd", rating: 2.1, category: leadCategory || "Cafe", url: "urbanbrew.co", impact: "Critical" },
            ];
            setFoundLeads(mocks);
            setIsSearchingLeads(false);
        }, 1500);
    };

    const convertToAccount = async (lead: any) => {
        // Optimistically add to the table
        const newSnapshot = {
            url: lead.url,
            grade: lead.rating < 3 ? 'D' : (lead.rating < 4 ? 'C' : 'B'),
            scoreDetails: {
                seo: 'Improvement Needed',
                security: 'Secure',
                performance: '2.4s',
                social: 'Missing Tags'
            },
            contactInfo: { emails: [`info@${lead.url}`], phones: ['(555) 123-4567'], socials: [] },
            purchasedProducts: [],
            timestamp: new Date().toISOString(),
            isProspective: true
        };

        try {
            // Save to backend
            await fetch('http://localhost:5001/api/generate-snapshot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessUrl: lead.url, manualData: newSnapshot })
            });
            fetchSnapshots();
            setIsLeadModalOpen(false);
            setFoundLeads([]);
            setLeadCategory('');
        } catch (err) {
            console.error("Failed to convert lead:", err);
        }
    };

    const getGradeColor = (grade: string) => {
        if (!grade) return 'bg-gray-50 text-gray-600 border-gray-100';
        const colors: any = {
            A: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            B: 'bg-blue-50 text-blue-600 border-blue-100',
            C: 'bg-amber-50 text-amber-600 border-amber-100',
            D: 'bg-orange-50 text-orange-600 border-orange-100',
            F: 'bg-rose-50 text-rose-600 border-rose-100',
        };
        return colors[grade[0].toUpperCase()] || 'bg-gray-50 text-gray-600 border-gray-100';
    };

    const filteredSnapshots = Array.isArray(snapshots) ? snapshots.filter(s =>
        s.url?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Globe className="w-4 h-4" /> Asset Management
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Websites</h1>
                        <p className="text-gray-500 text-lg font-medium">History of all audited digital assets and business information.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-96">
                            <input
                                type="text"
                                placeholder="Search audited sites..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                        <button
                            onClick={() => setIsLeadModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                        >
                            <Zap className="w-5 h-5 fill-white" /> Find Leads
                        </button>
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Business URL</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Snapshot Score</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Snapshot Report</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Products</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Audited</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Loading Records...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredSnapshots.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-gray-500 font-medium">
                                            No audits found. Run a new scan from the Home page.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSnapshots.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 tracking-tight">{item.url}</p>
                                                        <a href={item.url} target="_blank" className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:underline">
                                                            Visit Site <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl font-black ${getGradeColor(item.grade)} shadow-sm`}>
                                                        {item.grade}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100">
                                                        View Report
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className="relative group/dropdown">
                                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl cursor-default hover:border-blue-200 hover:bg-white transition-all shadow-sm">
                                                            <div className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black text-white">
                                                                {Array.isArray(item.purchasedProducts) ? item.purchasedProducts.length : (typeof item.purchasedProducts === 'number' ? item.purchasedProducts : 0)}
                                                            </div>
                                                            <span className="font-black text-[10px] text-gray-500 uppercase tracking-widest">Active Services</span>
                                                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover/dropdown:rotate-180 transition-transform" />
                                                        </div>

                                                        {/* Dropdown Content */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-50 p-2">
                                                            <div className="p-3 border-b border-gray-50 mb-1">
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Purchased Products</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                {(Array.isArray(item.purchasedProducts) && item.purchasedProducts.length > 0) ? (
                                                                    item.purchasedProducts.map((prod: string, pIdx: number) => (
                                                                        <div key={pIdx} className="p-2.5 hover:bg-blue-50 rounded-xl flex items-center gap-3 transition-colors group/item">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                                                            <span className="text-xs font-bold text-gray-700 group-hover/item:text-blue-600">{prod}</span>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    ['AI Receptionist', 'Reputation Manager', 'Listing Sync'].slice(0, (typeof item.purchasedProducts === 'number' ? item.purchasedProducts : 3)).map((prod, pIdx) => (
                                                                        <div key={pIdx} className="p-2.5 hover:bg-blue-50 rounded-xl flex items-center gap-3 transition-colors group/item">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                                            <span className="text-xs font-bold text-gray-700 group-hover/item:text-blue-600">{prod}</span>
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                            <div className="mt-2 pt-2 border-t border-gray-50">
                                                                <button className="w-full text-center py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                                                                    + Upsell Service
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    {item.contactInfo?.emails?.length > 0 ? (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                            {item.contactInfo.emails[0]}
                                                        </div>
                                                    ) : (
                                                        <div className="text-xs text-gray-300 italic">No email found</div>
                                                    )}
                                                    {item.contactInfo?.phones?.length > 0 && (
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                            {item.contactInfo.phones[0]}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-gray-900 shadow-sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-black shadow-lg shadow-gray-200 hover:bg-blue-600 transition-all">
                                                        View Report <ChevronRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Stats */}
                {!isLoading && filteredSnapshots.length > 0 && (
                    <div className="mt-8 flex justify-between items-center px-4">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Showing {filteredSnapshots.length} of {snapshots.length} Audited Sites
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-black text-emerald-600">
                                <TrendingUp className="w-4 h-4" /> Average Grade: B+
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Lead Intelligence Modal */}
            {isLeadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#F8FAFC] w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="bg-white p-10 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                    <Sparkles className="w-4 h-4" /> Lead Intelligence
                                </div>
                                <h2 className="text-4xl font-black tracking-tighter text-gray-900">Prospect for New Accounts</h2>
                                <p className="text-gray-500 font-medium">Find local businesses that need your digital services.</p>
                            </div>
                            <button
                                onClick={() => setIsLeadModalOpen(false)}
                                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-10">
                            {/* Search Bar */}
                            <form onSubmit={handleSearchLeads} className="flex gap-4 mb-10">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Enter business category (e.g. Restaurants, Law Firms, Dentists)"
                                        value={leadCategory}
                                        onChange={(e) => setLeadCategory(e.target.value)}
                                        className="w-full p-5 pl-14 bg-white border border-gray-200 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-bold text-lg"
                                        autoFocus
                                    />
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!leadCategory || isSearchingLeads}
                                    className="bg-gray-900 text-white px-10 rounded-[1.5rem] font-black hover:bg-blue-600 transition-all flex items-center gap-3 disabled:opacity-50 disabled:hover:bg-gray-900 shadow-lg"
                                >
                                    {isSearchingLeads ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Search <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>

                            {/* Results Area */}
                            <div className="min-h-[400px]">
                                {foundLeads.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {foundLeads.map((lead, lIdx) => (
                                            <div key={lIdx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${lead.impact === 'Critical' ? 'bg-rose-50 text-rose-600' :
                                                        lead.impact === 'High' ? 'bg-orange-50 text-orange-600' :
                                                            'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        {lead.impact} Impact Potential
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 mb-1">{lead.name}</h3>
                                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{lead.address}</p>

                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div key={i} className={`w-3 h-3 rounded-full ${i < Math.floor(lead.rating) ? 'bg-amber-400' : 'bg-gray-200'}`}></div>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-black text-gray-900">{lead.rating}</span>
                                                    <span className="text-gray-400 text-xs font-medium">• Needs Reputation Management</span>
                                                </div>

                                                <button
                                                    onClick={() => convertToAccount(lead)}
                                                    className="w-full py-4 bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-900 rounded-2xl font-black transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-5 h-5" /> Convert to Account
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : !isSearchingLeads && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                        <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center mb-6">
                                            <Search className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-xl font-bold text-gray-500">Discover nearby businesses and see how they can <br /> benefit from your products and services.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ArrowRight(props: any) {
    return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
}
