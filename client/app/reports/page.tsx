"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentHeader } from '@/components/workforce/AgentHeader';
import { PieChart, TrendingUp, Download, Activity, MessageSquare, Star, Users } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <AgentHeader 
          title="Executive Outcome Report" 
          description="Proof of Performance & AI Activity Log"
          icon={PieChart}
          status="active"
        />

        {/* Top Stats - ROI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-emerald-500/20"></div>
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-gray-400 font-medium text-sm">Digital Health Score</h3>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">A+</span>
                    <span className="text-sm text-emerald-400 flex items-center gap-1">
                        +42% <span className="text-gray-500">vs last month</span>
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20"></div>
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h3 className="text-gray-400 font-medium text-sm">Leads Captured</h3>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">142</span>
                    <span className="text-sm text-blue-400 flex items-center gap-1">
                        +12 <span className="text-gray-500">this week</span>
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20"></div>
                <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <h3 className="text-gray-400 font-medium text-sm">AI Actions Taken</h3>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">856</span>
                    <span className="text-sm text-purple-400 flex items-center gap-1">
                        Automated
                    </span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Activity Log */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        AI Workforce Activity
                    </h2>
                     <button className="text-sm text-blue-400 hover:text-white transition-colors">View All</button>
                </div>
                
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-800">
                    {[
                        { icon: MessageSquare, color: 'emerald', title: 'Start Conversation', desc: 'AI Receptionist engaged with a lead from Facebook.', time: '10 mins ago' },
                        { icon: Star, color: 'yellow', title: 'Review Replied', desc: 'Auto-drafted and posted response to 5-star Google review.', time: '2 hours ago' },
                        { icon: Users, color: 'blue', title: 'Appointment Booked', desc: 'Confirmed consultation with Mark S. for Tuesday 2pm.', time: '5 hours ago' },
                        { icon: TrendingUp, color: 'purple', title: 'SEO Optimized', desc: 'Updated meta tags for 4 landing pages based on new keywords.', time: '1 day ago' },
                    ].map((log, i) => (
                        <div key={i} className="flex gap-4 relative">
                            <div className={`w-10 h-10 rounded-full border-4 border-gray-900 bg-${log.color}-500/20 text-${log.color}-400 flex items-center justify-center shrink-0 z-10`}>
                                <log.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{log.title}</h4>
                                <p className="text-sm text-gray-400">{log.desc}</p>
                                <span className="text-xs text-gray-600 mt-1 block">{log.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Reports */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                     <h2 className="text-lg font-semibold mb-4 text-white">Monthly Reports</h2>
                     <p className="text-sm text-gray-400 mb-6">Download your consolidated performance summaries.</p>
                     
                     <div className="space-y-3">
                        {['October 2024', 'September 2024', 'August 2024'].map((month) => (
                            <div key={month} className="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                                        <Download className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{month} Report</span>
                                </div>
                                <span className="text-xs text-gray-500">PDF</span>
                            </div>
                        ))}
                     </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-center text-white shadow-lg shadow-blue-500/20">
                    <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
                    <p className="text-blue-100 text-sm mb-4">Unlock advanced analytics and competitor tracking.</p>
                    <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-xl hover:bg-gray-100 transition-colors w-full">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}
