"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { Briefcase, DollarSign, AlertTriangle, UserCheck, TrendingUp, MoreVertical } from 'lucide-react';

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <AgentHeader 
          title="Partner Intelligence" 
          description="Agency Overview & Revenue Intelligence"
          icon={Briefcase}
          status="active"
        />

         {/* MRR Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm font-medium">
                    <DollarSign className="w-4 h-4" /> Monthly Recurring Revenue
                </div>
                <div className="text-3xl font-bold text-white mb-1">$12,450</div>
                <div className="text-xs text-emerald-400">+8.2% vs last month</div>
            </div>
             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm font-medium">
                    <UserCheck className="w-4 h-4" /> Active Clients
                </div>
                <div className="text-3xl font-bold text-white mb-1">24</div>
                <div className="text-xs text-emerald-400">+2 New Clients</div>
            </div>
             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" /> Avg. Revenue Per User
                </div>
                <div className="text-3xl font-bold text-white mb-1">$518</div>
                <div className="text-xs text-gray-500">Flat vs last month</div>
            </div>
             <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                <div className="flex items-center gap-2 mb-2 text-red-400 text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" /> Churn Risk
                </div>
                <div className="text-3xl font-bold text-white mb-1">3</div>
                <div className="text-xs text-red-400">Clients needing attention</div>
            </div>
        </div>

        {/* Churn Risk Alerts */}
        <div className="mb-8">
             <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                Retention Alerts (Action Required)
            </h2>
            <div className="grid grid-cols-1 gap-4">
                 {[
                    { name: 'Lumiere Coffee', risk: 'High', reason: 'No login in 20 days', value: '$450/mo' },
                    { name: 'Apex Roofing', risk: 'Medium', reason: 'Declined performance score', value: '$850/mo' },
                    { name: 'City Yoga', risk: 'Medium', reason: 'Pending invoice (5 days)', value: '$300/mo' },
                ].map((client, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                                {client.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{client.name}</h4>
                                <p className="text-sm text-red-400 font-medium">{client.reason}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase">Value</p>
                                <p className="font-mono text-white">{client.value}</p>
                            </div>
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                                Contact
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Client List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Managed Clients</h2>
                <button className="text-sm text-blue-400 hover:text-white">View All</button>
            </div>
            
             <table className="w-full text-left">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Products</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">Acme Corp {i}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Active</span>
                            </td>
                            <td className="px-6 py-4 text-gray-400">SEO + AI Receptionist</td>
                            <td className="px-6 py-4 text-gray-500">Oct 2024</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-white">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </main>
    </div>
  );
}
