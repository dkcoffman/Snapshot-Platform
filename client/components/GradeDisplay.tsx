"use client";

import React from "react";

interface GradeDisplayProps {
    grade: string;
    score?: number;
}

export function GradeDisplay({ grade }: GradeDisplayProps) {
    const colorMap: Record<string, string> = {
        A: "text-green-500 from-green-500/20 to-green-500/5 border-green-500/30",
        B: "text-blue-500 from-blue-500/20 to-blue-500/5 border-blue-500/30",
        C: "text-yellow-500 from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
        D: "text-orange-500 from-orange-500/20 to-orange-500/5 border-orange-500/30",
        F: "text-red-500 from-red-500/20 to-red-500/5 border-red-500/30",
    };

    const theme = colorMap[grade] || colorMap["F"];

    return (
        <div className="relative group">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 bg-gradient-to-br ${theme} backdrop-blur-md shadow-2xl`}>
                <span className="text-6xl font-black">{grade}</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-current opacity-20 blur-xl -z-10 group-hover:opacity-30 transition-opacity" />
        </div>
    );
}
