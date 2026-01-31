"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Layout,
    ChevronLeft,
    Search,
    Filter,
    Monitor,
    Smartphone,
    Zap,
    Sparkles,
    CheckCircle2,
    Palette
} from 'lucide-react';
import Link from 'next/link';

const categories = ["All", "Business", "Portfolio", "Ecommerce", "Medical", "Agency"];

const templates = [
    { name: "Executive Suite", category: "Business", rating: 4.8, type: "Gutenberg", fast: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
    { name: "Creative Edge", category: "Portfolio", rating: 4.9, type: "Elementor", fast: true, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { name: "Urban Shop", category: "Ecommerce", rating: 4.7, type: "WooCommerce", fast: true, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
    { name: "Health Prime", category: "Medical", rating: 4.6, type: "Gutenberg", fast: true, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
    { name: "Growth Lab", category: "Agency", rating: 4.9, type: "Elementor", fast: true, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
    { name: "Modern Minimalist", category: "Portfolio", rating: 4.5, type: "Gutenberg", fast: true, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
];

export default function TemplateGallery() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredTemplates = selectedCategory === "All"
        ? templates
        : templates.filter(t => t.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <Link
                            href="/websites/wordpress"
                            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-black text-[10px] uppercase tracking-[0.2em] mb-4"
                        >
                            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Template Gallery</h1>
                        <p className="text-gray-500 text-lg font-medium">Choose a high-performance starter theme for your next project.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-72">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                                    : "bg-white text-gray-400 border border-gray-100 hover:border-gray-200 hover:text-gray-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {filteredTemplates.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            {/* Image Preview */}
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <span className="text-white text-xs font-black uppercase tracking-widest">Premium Build</span>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white shadow-lg">
                                        <Monitor className="w-4 h-4" />
                                    </div>
                                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white shadow-lg">
                                        <Smartphone className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{item.name}</h3>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{item.category}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                                        <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                                        <span className="text-[10px] font-black text-emerald-600 uppercase">Pro Performance</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                        Fully Mobile Responsive
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                        Optimized for Google Core Web Vitals
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                        Built with {item.type}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                                        <Palette className="w-4 h-4" /> Install Design
                                    </button>
                                    <button className="px-6 border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest">
                                        Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
