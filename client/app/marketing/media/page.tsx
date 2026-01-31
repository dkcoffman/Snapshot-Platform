"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import {
    Image as ImageIcon, Video, Upload, Search,
    MoreVertical, Download, Trash2, FolderPlus,
    Grid, List, Filter, FileText, CheckCircle2
} from 'lucide-react';

export default function MediaLibrary() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isDragging, setIsDragging] = useState(false);
    const [mediaItems, setMediaItems] = useState<any[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5001/api/media')
            .then(res => res.json())
            .then(data => setMediaItems(data))
            .catch(err => {
                console.error("Failed to load media:", err);
                // Fallback mock data
                setMediaItems([
                    { id: 1, name: "campaign-hero-01.jpg", type: "image", size: "2.4MB", date: "Oct 24, 2024", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" },
                    { id: 2, name: "customer-interview.mp4", type: "video", size: "48.2MB", date: "Oct 22, 2024", url: "#" },
                    { id: 3, name: "seasonal-promo-v2.png", type: "image", size: "1.1MB", date: "Oct 20, 2024", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2574" },
                ]);
            });
    }, []);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex font-sans">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <ImageIcon className="w-4 h-4" /> Asset Management
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Media Library</h1>
                        <p className="text-gray-500 text-lg font-medium">Global repository for marketing assets, narrative images, and compliance documents.</p>
                    </div>
                    <button className="bg-gray-900 text-white hover:bg-blue-600 px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-gray-200 flex items-center gap-3 transition-all active:scale-95">
                        <Upload className="w-6 h-6" /> Upload New Asset
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:w-[500px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find assets by name or tag..."
                            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-gray-900"
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                        <button className="flex items-center gap-3 px-6 py-3 text-xs font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest">
                            <Filter className="w-4 h-4" /> Filter Library
                        </button>
                    </div>
                </div>

                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mb-12 border-4 border-dashed rounded-[3rem] p-16 text-center transition-all duration-500 overflow-hidden relative group ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-100 bg-white shadow-sm'
                        }`}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 border border-gray-100 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                            <Upload className={`w-10 h-10 ${isDragging ? 'text-blue-600' : 'text-gray-300'}`} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">Batch Asset Processing</h2>
                        <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                            Drag-and-drop marketing collateral here. AI intelligently tags and optimizes for multi-channel distribution.
                        </p>
                        <input type="file" className="hidden" id="file-upload" multiple />
                        <label htmlFor="file-upload" className="mt-8 inline-block px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 cursor-pointer transition-all shadow-xl shadow-gray-200 active:scale-95">
                            Browse Local Storage
                        </label>
                    </div>
                </div>

                {/* Media Grid */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {mediaItems.map((item) => (
                            <div key={item.id} className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-blue-200 transition-all shadow-sm hover:shadow-2xl duration-500 animate-in fade-in slide-in-from-bottom-8">
                                <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                            <Video className="w-12 h-12 text-blue-400 opacity-50 group-hover:scale-110 transition-transform" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                                        <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white text-gray-900 active:scale-95">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {item.type === 'video' && (
                                        <div className="absolute bottom-4 left-4 px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-xl">
                                            Rich Media
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h4 className="font-black text-gray-900 tracking-tight truncate mb-2">{item.name}</h4>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.size}</span>
                                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{item.date?.split(',')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-50">
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Name</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Dimensions / Size</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Modified</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mediaItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors">
                                                        {item.type === 'image' ? <ImageIcon className="w-6 h-6 text-blue-600" /> : <Video className="w-6 h-6 text-purple-600" />}
                                                    </div>
                                                    <span className="font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-gray-400 text-xs tracking-widest uppercase">{item.size}</td>
                                            <td className="px-8 py-6 text-xs text-gray-400 font-bold uppercase tracking-widest">{item.date}</td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                                        <Download className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
