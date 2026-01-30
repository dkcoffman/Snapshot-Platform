"use client";

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ResultCardProps {
    title: string;
    status: "Pass" | "Improvement Needed" | "Secure" | "Unsecured" | "Ready" | "Missing Tags" | string;
    value?: string;
    description?: string;
    icon?: React.ReactNode;
}

export function ResultCard({ title, status, value, description, icon }: ResultCardProps) {
    const isPositive = ["Pass", "Secure", "Ready"].includes(status);
    const isNeutral = !isPositive; // Simplified for now

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em]">{title}</h3>
                <div className={`p-2 rounded-xl ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {isPositive ? (
                        <CheckCircle2 className="w-4 h-4" />
                    ) : (
                        <AlertCircle className="w-4 h-4" />
                    )}
                </div>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-gray-900 tracking-tight">{status}</span>
                {value && <span className="text-xs font-bold text-gray-400">({value})</span>}
            </div>

            {description && <p className="text-sm text-gray-500 font-medium leading-snug">{description}</p>}
        </div>
    );
}
