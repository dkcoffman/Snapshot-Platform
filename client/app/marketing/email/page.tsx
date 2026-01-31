"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Type, Image as ImageIcon, MousePointer2, Minus, Share2,
    Smartphone, Monitor, ChevronLeft, Save, Send, Trash2,
    Settings, Layout, Layers, Info, Sparkles
} from 'lucide-react';

type ElementType = 'text' | 'image' | 'button' | 'divider' | 'social';

interface EmailElement {
    id: string;
    type: ElementType;
    content: any;
    style: any;
}

export default function EmailBuilder() {
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
    const [elements, setElements] = useState<EmailElement[]>([
        {
            id: '1',
            type: 'text',
            content: { html: '<h1 style="text-align: center; font-size: 28px; font-weight: 900; letter-spacing: -0.05em; color: #111827;">Welcome to the New Era</h1><p style="text-align: center; color: #6B7280; font-weight: 500; font-size: 16px;">We are excited to share our latest intelligence updates with you.</p>' },
            style: { padding: '40px 20px' }
        }
    ]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

    const addElement = (type: ElementType) => {
        const newElement: EmailElement = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: getDefaultContent(type),
            style: { padding: '20px' }
        };
        setElements([...elements, newElement]);
        setSelectedElementId(newElement.id);
    };

    const getDefaultContent = (type: ElementType) => {
        switch (type) {
            case 'text': return { html: '<p style="color: #374151;">New narrative block ready for high-conversion copywriting...</p>' };
            case 'image': return { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3', alt: 'Marketing Hero' };
            case 'button': return { text: 'Elevate Strategy', url: '#' };
            case 'divider': return {};
            case 'social': return { platforms: ['Facebook', 'LinkedIn', 'Twitter'] };
            default: return {};
        }
    };

    const deleteElement = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setElements(elements.filter(el => el.id !== id));
        if (selectedElementId === id) setSelectedElementId(null);
    };

    const selectedElement = elements.find(el => el.id === selectedElementId);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex overflow-hidden font-sans">
            <Sidebar />

            <div className="flex-1 ml-72 flex flex-col h-screen">
                {/* Header/Controls */}
                <header className="h-20 border-b border-gray-100 bg-white px-8 flex items-center justify-between z-20">
                    <div className="flex items-center gap-6">
                        <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 active:scale-95">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg font-black text-gray-900 tracking-tight">Monthly ROI Campaign Template</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Draft Strategy</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manual Save 2m ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${viewMode === 'desktop' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            <Monitor className="w-4 h-4" /> Desktop
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${viewMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            <Smartphone className="w-4 h-4" /> Mobile
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2.5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                            Preview
                        </button>
                        <button className="flex items-center gap-3 px-6 py-3 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl text-sm font-black transition-all shadow-xl shadow-gray-200 active:scale-95">
                            <Send className="w-4 h-4" /> Final Dispatch
                        </button>
                        <button className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all active:scale-95">
                            <Save className="w-5 h-5 text-gray-900" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar: Components */}
                    <aside className="w-80 bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => setActiveTab('content')}
                                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Architecture
                            </button>
                            <button
                                onClick={() => setActiveTab('design')}
                                className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'design' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Appearance
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {activeTab === 'content' ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { type: 'text', icon: Type, label: 'Narrative' },
                                            { type: 'image', icon: ImageIcon, label: 'Asset' },
                                            { type: 'button', icon: MousePointer2, label: 'CTA' },
                                            { type: 'divider', icon: Minus, label: 'Break' },
                                            { type: 'social', icon: Share2, label: 'Social' },
                                            { type: 'layout', icon: Layout, label: 'Section' },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                draggable
                                                onClick={() => addElement(item.type as ElementType)}
                                                className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-blue-500/50 hover:bg-blue-50 transition-all group shadow-sm active:scale-95"
                                            >
                                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-600 text-gray-400 group-hover:text-white transition-all mb-3">
                                                    <item.icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2.5rem]">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                                <Info className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Compliance Engine</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            Global footer is locked to ensure 100% compliance with **GDPR, CASL, and CAN-SPAM**. Edit company data in Identity Settings.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Global Typography</label>
                                        <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                            <option>Inter (Modern Sans)</option>
                                            <option>Roboto (Universal)</option>
                                            <option>Outfit (Premium)</option>
                                            <option>Sora (Geometric)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Canvas Backdrop</label>
                                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 cursor-pointer shadow-inner"></div>
                                            <span className="text-sm font-black text-gray-900 tracking-tight">#F8FAFC</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Responsive Width</label>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" defaultValue={600} min={480} max={900} />
                                            <div className="flex justify-between mt-3 text-[10px] font-black text-gray-400 uppercase">
                                                <span>480px</span>
                                                <span className="text-blue-600">600px Max</span>
                                                <span>900px</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Canvas */}
                    <div className="flex-1 bg-gray-50 overflow-y-auto p-20 flex justify-center custom-scrollbar">
                        <div
                            className={`bg-white shadow-2xl transition-all duration-500 min-h-[900px] flex flex-col rounded-[2rem] border border-gray-100 overflow-hidden ${viewMode === 'desktop' ? 'w-[600px]' : 'w-[375px]'}`}
                        >
                            {/* Logo Row */}
                            <div className="p-12 pb-6 flex justify-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
                                        <div className="w-5 h-5 bg-white rounded-md"></div>
                                    </div>
                                    <div className="text-xs font-black text-gray-900 tracking-[0.3em] uppercase">
                                        Partner Network
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Content */}
                            <div className="flex-1">
                                {elements.map((el) => (
                                    <div
                                        key={el.id}
                                        onClick={() => setSelectedElementId(el.id)}
                                        className={`relative group cursor-pointer transition-all border-2 ${selectedElementId === el.id ? 'border-blue-500 z-10' : 'border-transparent hover:border-blue-500/20'}`}
                                    >
                                        {selectedElementId === el.id && (
                                            <div className="absolute -top-12 right-0 flex items-center bg-blue-600 text-white rounded-2xl px-3 py-1.5 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                                                <button onClick={(e) => deleteElement(e, el.id)} className="p-1.5 hover:bg-rose-500 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="mx-2 h-4 w-[1px] bg-white/20"></div>
                                                <button className="p-1.5 hover:bg-blue-700 rounded-lg transition-colors">
                                                    <Layers className="w-4 h-4" />
                                                </button>
                                                <div className="mx-2 h-4 w-[1px] bg-white/20"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest px-1">{el.type}</span>
                                            </div>
                                        )}

                                        <div className="text-gray-900 overflow-hidden" style={el.style}>
                                            {el.type === 'text' && <div dangerouslySetInnerHTML={{ __html: el.content.html }} className="prose prose-sm max-w-none font-medium leading-relaxed" />}
                                            {el.type === 'image' && <img src={el.content.src} alt={el.content.alt} className="w-full h-auto rounded-[2rem] shadow-sm border border-gray-100" />}
                                            {el.type === 'button' && (
                                                <div className="flex justify-center py-6">
                                                    <a href={el.content.url} className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-gray-200 hover:bg-blue-600 transition-all flex items-center gap-3">
                                                        {el.content.text} <ArrowRight className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            )}
                                            {el.type === 'divider' && <hr className="border-gray-100 my-8 w-1/4 mx-auto border-2 rounded-full" />}
                                            {el.type === 'social' && (
                                                <div className="flex justify-center gap-6 py-8">
                                                    {el.content.platforms.map((p: string) => (
                                                        <span key={p} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm border border-gray-100">
                                                            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mandatory Legal Footer (Locked) */}
                            <footer className="p-16 border-t border-gray-50 bg-gray-50/50 text-center">
                                <div className="space-y-6 max-w-[400px] mx-auto opacity-70">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Global Governance Lock</p>
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-900 leading-relaxed uppercase tracking-tighter">OCC Catalyst • 123 Tech Avenue • Suite 400 • Palo Alto, CA 94301</p>
                                    <p className="text-[10px] font-medium text-gray-500 leading-relaxed">You received this communique as an official partner. We protect your data and narrative in accordance with global Privacy and Compliance mandates.</p>
                                    <div className="flex justify-center gap-6 pt-4">
                                        <a href="/preferences" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Preferences</a>
                                        <a href="/preferences?unsubscribe=all" className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Opt-Out</a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>

                    {/* Right Panel: Settings */}
                    <aside className="w-80 bg-white border-l border-gray-100 flex flex-col overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Element Properties</h2>
                            <Settings className="w-4 h-4 text-gray-400" />
                        </div>

                        {selectedElement ? (
                            <div className="p-8 space-y-10 animate-in slide-in-from-right-4 duration-300">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Composition</label>
                                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                                            {selectedElement.type === 'text' && <Type className="w-6 h-6" />}
                                            {selectedElement.type === 'image' && <ImageIcon className="w-6 h-6" />}
                                            {selectedElement.type === 'button' && <MousePointer2 className="w-6 h-6" />}
                                            {selectedElement.type === 'divider' && <Minus className="w-6 h-6" />}
                                            {selectedElement.type === 'social' && <Share2 className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900 capitalize tracking-tight">{selectedElement.type} Block</p>
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Selector</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedElement.type === 'text' && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Narrative Content</label>
                                            <textarea
                                                className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-5 text-sm font-bold text-gray-700 min-h-[200px] focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm"
                                                defaultValue={selectedElement.content.html}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedElement.type === 'button' && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Action Text</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-black text-gray-900" defaultValue={selectedElement.content.text} />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination URL</label>
                                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-black text-gray-900" defaultValue={selectedElement.content.url} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6 pt-6 border-t border-gray-50">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Spacing</label>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-black text-gray-400 uppercase ml-1">Top</span>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black" defaultValue={20} />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-black text-gray-400 uppercase ml-1">Bottom</span>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-black" defaultValue={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-purple-50 border border-purple-100 rounded-[2rem] flex items-start gap-4">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">AI Copywriter</p>
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Optimize narrative for 45% higher engagement.</p>
                                        <button className="text-[10px] font-black text-purple-600 hover:text-purple-800 transition-colors uppercase tracking-widest mt-2 underline underline-offset-2">Run Analysis</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <MousePointer2 className="w-10 h-10 text-gray-200" />
                                </div>
                                <h3 className="text-lg font-black text-gray-300">No Selection</h3>
                                <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">Select any composition block on the canvas to refine its specific properties.</p>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}
