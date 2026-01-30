"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AgentHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    status?: 'active' | 'inactive' | 'configuring';
}

export function AgentHeader({ title, description, icon: Icon, status = 'active' }: AgentHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        {title}
                        {status === 'active' && (
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-400 mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
}
