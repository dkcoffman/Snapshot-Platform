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
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
                {isPositive ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
            </div>

            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-white">{status}</span>
                {value && <span className="text-sm text-gray-500">({value})</span>}
            </div>

            {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
    );
}
