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
        fetch('http://localhost:5000/api/media')
            .then(res => res.json())
            .then(data => setMediaItems(data))
            .catch(err => console.error("Failed to load media:", err));
    }, []);

    const handleUpload = async (name: string, type: string, size: string) => {
        const newItem = {
            name,
            type,
            size,
            url: type === 'image' ? 'https://via.placeholder.com/400x225?text=New+Upload' : '#'
        };

        const res = await fetch('http://localhost:5000/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });

        if (res.ok) {
            const savedItem = await res.json();
            setMediaItems([savedItem, ...mediaItems]);
        }
    };

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
        // In a real app, handle file processing here
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                <AgentHeader
                    title="Media Library"
                    description="Upload and manage your marketing assets (Images, Videos, Documents)"
                    icon={ImageIcon}
                    status="active"
                />

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-800 text-blue-400' : 'text-gray-500 hover:text-white'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-all">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                            <Upload className="w-4 h-4" /> Upload New
                        </button>
                    </div>
                </div>

                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mb-8 border-2 border-dashed rounded-3xl p-12 text-center transition-all ${isDragging ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800 hover:border-gray-700 bg-gray-900/30'}`}
                >
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700 group-hover:scale-110 transition-transform">
                        <Upload className={`w-10 h-10 ${isDragging ? 'text-blue-400' : 'text-gray-500'}`} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Drop files here to upload</h2>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        High-resolution images and videos supported. Stored securely in your dedicated database.
                    </p>
                    <input type="file" className="hidden" id="file-upload" multiple />
                    <label htmlFor="file-upload" className="mt-6 inline-block text-blue-400 hover:text-white font-bold cursor-pointer transition-colors">
                        Or browse files on your computer
                    </label>
                </div>

                {/* Media Grid */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mediaItems.map((item) => (
                            <div key={item.id} className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all">
                                <div className="aspect-video bg-gray-950 relative overflow-hidden flex items-center justify-center">
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <Video className="w-12 h-12 text-gray-700 group-hover:text-blue-500 transition-colors" />
                                    )}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-gray-900/80 backdrop-blur-md rounded-lg hover:bg-gray-800">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {item.type === 'video' && (
                                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                                            Video
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-semibold text-white truncate mb-1">{item.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.size}</span>
                                        <span className="text-[10px] text-gray-600">{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800/50 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-800">
                                <tr>
                                    <th className="px-6 py-4">Asset</th>
                                    <th className="px-6 py-4">Size</th>
                                    <th className="px-6 py-4">Date Added</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {mediaItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-950 rounded-lg flex items-center justify-center border border-gray-800">
                                                    {item.type === 'image' ? <ImageIcon className="w-5 h-5 text-blue-500" /> : <Video className="w-5 h-5 text-purple-500" />}
                                                </div>
                                                <span className="font-medium text-white group-hover:text-blue-400 transition-colors">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{item.size}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
