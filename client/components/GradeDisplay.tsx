"use client";

import React from "react";

interface GradeDisplayProps {
    grade: string;
    score?: number;
}

export function GradeDisplay({ grade }: GradeDisplayProps) {
    const colorMap: Record<string, string> = {
        A: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-100",
        B: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-100",
        C: "text-amber-600 bg-amber-50 border-amber-100 shadow-amber-100",
        D: "text-orange-600 bg-orange-50 border-orange-100 shadow-orange-100",
        F: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-100",
    };

    const theme = colorMap[grade] || colorMap["F"];

    return (
        <div className="relative group perspective-1000">
            <div className={`w-40 h-40 rounded-[2.5rem] flex items-center justify-center border-2 ${theme} shadow-2xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-105`}>
                <span className="text-7xl font-black tracking-tighter">{grade}</span>
            </div>
            {/* Subtle glow background */}
            <div className={`absolute inset-4 blur-3xl opacity-20 -z-10 ${theme.split(' ')[0]} transition-opacity group-hover:opacity-40`} />
        </div>
    );
}
