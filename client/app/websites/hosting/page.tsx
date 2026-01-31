"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import {
    Server,
    Zap,
    Shield,
    Globe,
    Database,
    Code2,
    Users,
    Settings,
    Activity,
    Lock,
    GitBranch,
    RefreshCcw,
    ChevronRight,
    Search,
    Plus,
    CheckCircle2,
    X,
    Layout,
    Laptop,
    Rocket
} from 'lucide-react';
import Link from 'next/link';

const ResourceCard = ({ label, value, percentage, icon: Icon, color }: any) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group">
        <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tighter">{value}</p>
            </div>
        </div>
        <div className="relative h-2 bg-gray-50 rounded-full overflow-hidden mb-2">
            <div
                className={`absolute inset-y-0 left-0 bg-${color}-500 rounded-full transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
            />
        </div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{percentage}% Capacity Reached</p>
    </div>
);

const ToolCard = ({ title, description, icon: Icon, tag }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Icon className="w-6 h-6" />
            </div>
            {tag && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {tag}
                </span>
            )}
        </div>
        <h4 className="text-lg font-black text-gray-900 mb-2">{title}</h4>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">{description}</p>
    </div>
);

export default function HostingDashboard() {
    const [sites, setSites] = useState([
        { domain: "lumiere-coffee.com", type: "Primary Domain", ip: "34.102.136.198", dc: "Iowa, USA", ssl: "Let's Encrypt Wildcard" },
        { domain: "urbanfit.io", type: "Addon Domain", ip: "34.102.136.198", dc: "Iowa, USA", ssl: "Premium SSL" },
    ]);

    const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [newDomain, setNewDomain] = useState('');
    const [selectedApp, setSelectedApp] = useState('');
    const [isProvisioning, setIsProvisioning] = useState(false);
    const [provisioningProgress, setProvisioningProgress] = useState<string[]>([]);

    const handleNextStep = () => setWizardStep(prev => prev + 1);
    const handlePrevStep = () => setWizardStep(prev => prev - 1);

    const startProvisioning = async () => {
        setIsProvisioning(true);
        const steps = [
            "Allocating Premier server resources...",
            "Initializing isolated container environment...",
            "Installing selected application stack...",
            "Securing with Let's Encrypt SSL...",
            "Configuring Global CDN cache..."
        ];

        for (let i = 0; i < steps.length; i++) {
            setProvisioningProgress(prev => [...prev, steps[i]]);
            await new Promise(r => setTimeout(r, 800));
        }

        setTimeout(() => {
            const newSite = {
                domain: newDomain,
                type: "Performance Addon",
                ip: "34.102.136.198",
                dc: "Iowa, USA",
                ssl: "Let's Encrypt Wildcard"
            };
            setSites(prev => [newSite, ...prev]);
            setIsProvisioning(false);
            setIsAddSiteModalOpen(false);
            resetWizard();
        }, 500);
    };

    const resetWizard = () => {
        setWizardStep(1);
        setNewDomain('');
        setSelectedApp('');
        setProvisioningProgress([]);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            <Sidebar />

            <main className="flex-1 ml-72 p-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Server className="w-4 h-4" /> Premier Enterprise Tier
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">Web Hosting</h1>
                        <p className="text-gray-500 text-lg font-medium">Enterprise resources with 3x higher priority and white-label tools.</p>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-white border border-gray-200 text-gray-900 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-sm transition-all active:scale-95">
                            <RefreshCcw className="w-5 h-5" /> Site Tools
                        </button>
                        <button
                            onClick={() => setIsAddSiteModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" /> Add New Site
                        </button>
                    </div>
                </div>

                {/* Performance Banner */}
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-[3rem] p-10 mb-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                                <Zap className="w-4 h-4 fill-blue-400" /> Ultra-Fast PHP & MySQL
                            </div>
                            <h2 className="text-4xl font-black tracking-tighter mb-4">Highest Tier Server Resources</h2>
                            <p className="text-blue-100/70 text-lg font-medium mb-8">
                                Your account is hosted on our highest-performance servers, providing 3x more resources and priority support.
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-3xl font-black text-white">40GB</p>
                                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Web Space</p>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div>
                                    <p className="text-3xl font-black text-white">400k+</p>
                                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Expected Visits</p>
                                </div>
                                <div className="w-px h-12 bg-white/10" />
                                <div>
                                    <p className="text-3xl font-black text-white">99.9%</p>
                                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Uptime Guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <Activity className="w-64 h-64 text-blue-500/20 -mr-10" />
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[80px] -ml-32 -mb-32" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <ResourceCard label="Web Space" value="12.4 GB / 40 GB" percentage={31} icon={Database} color="blue" />
                    <ResourceCard label="Traffic Flow" value="124k / 400k" percentage={28} icon={Globe} color="emerald" />
                    <ResourceCard label="CPU Usage" value="0.21 / 1.0" percentage={21} icon={Activity} color="purple" />
                    <ResourceCard label="I/O Usage" value="14.2 MB/s" percentage={15} icon={Zap} color="orange" />
                </div>

                {/* Developer & Agency Tools */}
                <h3 className="text-2xl font-black tracking-tight mb-8">Developer & Agency Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <ToolCard
                        title="Staging Environments"
                        description="Create a copy of your site with one click to test changes safely before pushing live."
                        icon={RefreshCcw}
                        tag="Included"
                    />
                    <ToolCard
                        title="Git Integration"
                        description="Easily deploy your coding projects from Git repositories to your hosting account."
                        icon={GitBranch}
                        tag="Included"
                    />
                    <ToolCard
                        title="White-label Clients"
                        description="Provide your clients with access to Site Tools under your own agency branding."
                        icon={Users}
                        tag="Enterprise Only"
                    />
                    <ToolCard
                        title="Private DNS"
                        description="Use your own domain for your name servers (ns1.yourdomain.com) for a more professional look."
                        icon={Shield}
                        tag="Enterprise Only"
                    />
                    <ToolCard
                        title="Highest Tier Resources"
                        description="3x more server resources than standard plans, ensuring peak performance."
                        icon={Zap}
                        tag="Active"
                    />
                    <ToolCard
                        title="Priority Support"
                        description="Your tickets are bumped to the top of our queue and handled by top-tier technicians."
                        icon={Settings}
                        tag="24/7 Global"
                    />
                </div>

                {/* Domain & IP Section */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Active Sites & Domains</h3>
                            <p className="text-sm font-medium text-gray-500">Manage hosting settings for individual domains.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                Global CDN Active
                            </span>
                        </div>
                    </div>
                    <div className="p-8">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <th className="pb-6">Domain</th>
                                    <th className="pb-6">IP Address</th>
                                    <th className="pb-6">Data Center</th>
                                    <th className="pb-6">SSL Status</th>
                                    <th className="pb-6 text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {sites.map((site, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="py-6 pt-8">
                                            <p className="font-black text-gray-900 tracking-tight">{site.domain}</p>
                                            <p className="text-xs font-bold text-gray-400">{site.type}</p>
                                        </td>
                                        <td className="py-6 pt-8">
                                            <span className="text-sm font-bold text-gray-600 font-mono">{site.ip}</span>
                                        </td>
                                        <td className="py-6 pt-8">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="text-sm font-bold text-gray-700">{site.dc}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 pt-8">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {site.ssl}
                                            </span>
                                        </td>
                                        <td className="py-6 pt-8 text-right">
                                            <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                                                <Settings className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Provisioning Wizard Modal */}
                {isAddSiteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
                            {/* Modal Header */}
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight">New Site Provisioning</h3>
                                </div>
                                <button
                                    onClick={() => setIsAddSiteModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="p-10">
                                {isProvisioning ? (
                                    <div className="py-12 flex flex-col items-center">
                                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                                        <div className="w-full space-y-4 max-w-sm">
                                            {provisioningProgress.map((step, i) => (
                                                <div key={i} className="flex items-center gap-3 animate-in slide-in-from-bottom-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-sm font-bold text-gray-700">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Step Indicators */}
                                        <div className="flex gap-2 mb-10">
                                            {[1, 2, 3].map(step => (
                                                <div
                                                    key={step}
                                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${wizardStep >= step ? 'bg-blue-600' : 'bg-gray-100'}`}
                                                />
                                            ))}
                                        </div>

                                        {wizardStep === 1 && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                                <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Step 1: Domain Setup</h2>
                                                <p className="text-gray-500 font-medium mb-8">Enter the domain you'd like to provision on the Enterprise cluster.</p>

                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. coffee-roasters.com"
                                                        value={newDomain}
                                                        onChange={(e) => setNewDomain(e.target.value)}
                                                        className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg"
                                                        autoFocus
                                                    />
                                                    <Globe className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                                                </div>

                                                <button
                                                    disabled={!newDomain}
                                                    onClick={handleNextStep}
                                                    className="w-full mt-8 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    Next Step <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}

                                        {wizardStep === 2 && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                                <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Step 2: Choose Application</h2>
                                                <p className="text-gray-500 font-medium mb-8">Select the tech stack for your new enterprise site.</p>

                                                <div className="grid grid-cols-1 gap-4">
                                                    {[
                                                        { id: 'wp', title: 'Managed WordPress', desc: 'Optimized stack with auto-updates and template library.', icon: Layout, color: 'blue' },
                                                        { id: 'php', title: 'Custom PHP', desc: 'Secure environment for custom application builds.', icon: Code2, color: 'purple' },
                                                        { id: 'static', title: 'Static Site', desc: 'High-speed static hosting for HTML/JS projects.', icon: Rocket, color: 'emerald' },
                                                    ].map(app => (
                                                        <div
                                                            key={app.id}
                                                            onClick={() => setSelectedApp(app.id)}
                                                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-5 ${selectedApp === app.id ? 'border-blue-600 bg-blue-50/50' : 'border-gray-50 hover:border-gray-200'}`}
                                                        >
                                                            <div className={`p-3 rounded-xl ${selectedApp === app.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                                <app.icon className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-black text-gray-900">{app.title}</h4>
                                                                <p className="text-sm font-medium text-gray-500">{app.desc}</p>
                                                            </div>
                                                            {selectedApp === app.id && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-4 mt-8">
                                                    <button
                                                        onClick={handlePrevStep}
                                                        className="flex-1 py-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-black text-lg hover:border-blue-600 transition-all"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        disabled={!selectedApp}
                                                        onClick={handleNextStep}
                                                        className="flex-[2] py-5 bg-gray-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                    >
                                                        Review Setup <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {wizardStep === 3 && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                                <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Step 3: Confirm Setup</h2>
                                                <p className="text-gray-500 font-medium mb-8">Ready to provision your new enterprise environment.</p>

                                                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 mb-8">
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Domain</span>
                                                        <span className="font-black text-gray-900">{newDomain}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">App Engine</span>
                                                        <span className="font-black text-gray-900 capitalize">{selectedApp === 'wp' ? 'Managed WordPress' : selectedApp === 'php' ? 'Custom PHP' : 'Static Site'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resource Plan</span>
                                                        <span className="text-blue-600 font-black">Premier Enterprise</span>
                                                    </div>
                                                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Provisioning Fee</span>
                                                        <span className="font-black text-emerald-600">Included in Tier</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={handlePrevStep}
                                                        className="flex-1 py-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-black text-lg hover:border-blue-600 transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={startProvisioning}
                                                        className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                                                    >
                                                        Confirm & Provision <Rocket className="w-5 h-5 fill-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
