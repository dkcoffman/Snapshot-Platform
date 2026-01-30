"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Type, Image as ImageIcon, MousePointer2, Minus, Share2,
    Smartphone, Monitor, ChevronLeft, Save, Send, Trash2,
    Settings, Layout, Layers, Info
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
            content: { html: '<h1 style="text-align: center; font-size: 24px;">Welcome to Our Newsletter</h1><p style="text-align: center; color: #666;">We are excited to share our latest updates with you.</p>' },
            style: { padding: '20px' }
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
            case 'text': return { html: '<p>New text block ready for editing...</p>' };
            case 'image': return { src: 'https://via.placeholder.com/600x300', alt: 'Placeholder' };
            case 'button': return { text: 'Click Here', url: '#' };
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
        <div className="min-h-screen bg-gray-950 text-white flex overflow-hidden">
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col h-screen">
                {/* Header/Controls */}
                <header className="h-16 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-6 flex items-center justify-between z-20">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-sm font-semibold text-white">Monthly Update Template</h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Draft • Saved 2m ago</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-950 p-1 rounded-lg border border-gray-800">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-gray-800 text-blue-400 shadow-sm' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-gray-800 text-blue-400 shadow-sm' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Preview
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                            <Send className="w-4 h-4" /> Send Test
                        </button>
                        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors">
                            <Save className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar: Components */}
                    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col overflow-y-auto">
                        <div className="flex border-b border-gray-800">
                            <button
                                onClick={() => setActiveTab('content')}
                                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'content' ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Content
                            </button>
                            <button
                                onClick={() => setActiveTab('design')}
                                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'design' ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Design
                            </button>
                        </div>

                        <div className="p-4 space-y-6">
                            {activeTab === 'content' ? (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { type: 'text', icon: Type, label: 'Text' },
                                            { type: 'image', icon: ImageIcon, label: 'Image' },
                                            { type: 'button', icon: MousePointer2, label: 'Button' },
                                            { type: 'divider', icon: Minus, label: 'Divider' },
                                            { type: 'social', icon: Share2, label: 'Social' },
                                            { type: 'layout', icon: Layout, label: 'Section' },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                draggable
                                                onClick={() => addElement(item.type as ElementType)}
                                                className="flex flex-col items-center justify-center p-4 bg-gray-950 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900 transition-all group"
                                            >
                                                <item.icon className="w-6 h-6 text-gray-500 group-hover:text-blue-400 mb-2 transition-colors" />
                                                <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-tighter">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Info className="w-3 h-3 text-blue-400" />
                                            <span className="text-[10px] font-bold text-blue-400 uppercase">Compliance Pro-Tip</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 leading-relaxed">
                                            We've locked your legal footer to comply with **GDPR, CASL, and CAN-SPAM**. You can edit the address in Settings.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Font</label>
                                        <select className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none">
                                            <option>Inter (Sans Serif)</option>
                                            <option>Roboto</option>
                                            <option>Arial</option>
                                            <option>Georgia</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Background Color</label>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-md bg-gray-100 border border-gray-700 cursor-pointer"></div>
                                            <span className="text-sm text-gray-400">#F3F4F6</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Body Width</label>
                                        <div className="flex items-center gap-4">
                                            <input type="range" className="flex-1 accent-blue-500" defaultValue={600} min={480} max={900} />
                                            <span className="text-sm text-gray-400">600px</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Canvas */}
                    <div className="flex-1 bg-gray-950 overflow-y-auto p-12 flex justify-center custom-scrollbar">
                        <div
                            className={`bg-white shadow-2xl transition-all duration-300 min-h-[800px] flex flex-col ${viewMode === 'desktop' ? 'w-[600px]' : 'w-[375px]'}`}
                        >
                            {/* Logo Row */}
                            <div className="p-8 pb-4 flex justify-center">
                                <div className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                                    OCC CATALYST
                                </div>
                            </div>

                            {/* Dynamic Content */}
                            <div className="flex-1">
                                {elements.map((el) => (
                                    <div
                                        key={el.id}
                                        onClick={() => setSelectedElementId(el.id)}
                                        className={`relative group cursor-pointer transition-all border-2 ${selectedElementId === el.id ? 'border-blue-500 z-10' : 'border-transparent hover:border-blue-500/30'}`}
                                    >
                                        {selectedElementId === el.id && (
                                            <div className="absolute -top-10 right-0 flex items-center bg-blue-500 text-white rounded-t-lg px-2 py-1 shadow-lg">
                                                <button onClick={(e) => deleteElement(e, el.id)} className="p-1 hover:bg-blue-600 rounded">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="mx-1 h-4 w-[1px] bg-blue-400"></div>
                                                <button className="p-1 hover:bg-blue-600 rounded">
                                                    <Layers className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}

                                        <div className="text-gray-900 overflow-hidden" style={el.style}>
                                            {el.type === 'text' && <div dangerouslySetInnerHTML={{ __html: el.content.html }} className="prose prose-sm max-w-none" />}
                                            {el.type === 'image' && <img src={el.content.src} alt={el.content.alt} className="w-full h-auto rounded-lg" />}
                                            {el.type === 'button' && (
                                                <div className="flex justify-center py-4">
                                                    <a href={el.content.url} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all">
                                                        {el.content.text}
                                                    </a>
                                                </div>
                                            )}
                                            {el.type === 'divider' && <hr className="border-gray-200 my-4" />}
                                            {el.type === 'social' && (
                                                <div className="flex justify-center gap-4 py-4 text-gray-600">
                                                    {el.content.platforms.map((p: string) => (
                                                        <span key={p} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                                            <Share2 className="w-4 h-4" />
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mandatory Legal Footer (Locked) */}
                            <footer className="p-12 border-t border-gray-100 bg-gray-50 text-center text-[11px] text-gray-500">
                                <div className="space-y-4 max-w-[400px] mx-auto opacity-70">
                                    <p className="font-semibold text-gray-700">OCC Catalyst • 123 Tech Avenue • Suite 400 • Palo Alto, CA 94301</p>
                                    <p>You received this email because you subscribed to our marketing updates. We respect your privacy and follow all global regulations including GDPR, CAN-SPAM, and PECR.</p>
                                    <div className="flex justify-center gap-4 text-blue-600 font-medium">
                                        <a href="/preferences" className="hover:underline">Manage Preferences</a>
                                        <span className="text-gray-300">|</span>
                                        <a href="/preferences?unsubscribe=all" className="hover:underline text-red-500">Unsubscribe</a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>

                    {/* Right Panel: Settings */}
                    <aside className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col overflow-y-auto">
                        <div className="p-4 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Settings</h2>
                            <Settings className="w-4 h-4 text-gray-600" />
                        </div>

                        {selectedElement ? (
                            <div className="p-6 space-y-8 animate-in slide-in-from-right-4 duration-300">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</label>
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                            {selectedElement.type === 'text' && <Type className="w-4 h-4" />}
                                            {selectedElement.type === 'image' && <ImageIcon className="w-4 h-4" />}
                                            {selectedElement.type === 'button' && <MousePointer2 className="w-4 h-4" />}
                                            {selectedElement.type === 'divider' && <Minus className="w-4 h-4" />}
                                            {selectedElement.type === 'social' && <Share2 className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white capitalize">{selectedElement.type}</p>
                                            <p className="text-[10px] text-blue-400">Active Element</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedElement.type === 'text' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Text Content</label>
                                            <textarea
                                                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-300 min-h-[150px] focus:ring-1 focus:ring-blue-500 outline-none"
                                                defaultValue={selectedElement.content.html}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedElement.type === 'button' && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Button Text</label>
                                            <input type="text" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-white" defaultValue={selectedElement.content.text} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Target URL</label>
                                            <input type="text" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-white" defaultValue={selectedElement.content.url} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 pt-4 border-t border-gray-800">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Spacing</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[9px] text-gray-500">Top Padding</span>
                                            <input type="number" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs" defaultValue={20} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] text-gray-500">Bottom Padding</span>
                                            <input type="number" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs" defaultValue={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-50">
                                <MousePointer2 className="w-10 h-10 text-gray-700 mb-4" />
                                <p className="text-sm text-gray-500">Click an element on the canvas to edit its properties</p>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}
