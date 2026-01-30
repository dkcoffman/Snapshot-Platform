"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    PieChart,
    ShoppingBag,
    Users,
    Mail,
    MessageSquare,
    CheckCircle2,
    PenTool,
    Settings,
    ChevronDown,
    ChevronRight,
    Headphones,
    FileText,
    TrendingUp,
    Briefcase,
    Globe,
    Activity
} from "lucide-react";
import React, { useState } from "react";

export function Sidebar() {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
        overview: true,
        acquisition: true,
        fulfillment: true
    });

    const toggleMenu = (menu: string) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const NavItem = ({ href, icon: Icon, label, active = false }: any) => (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group ${active
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            <Icon className={`w-4 h-4 transition-colors ${active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
            <span className="text-sm">{label}</span>
        </Link>
    );

    const MenuSection = ({ id, label, children }: any) => (
        <div className="mb-4">
            <button
                onClick={() => toggleMenu(id)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
            >
                {label}
                {openMenus[id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {openMenus[id] && (
                <div className="mt-1 space-y-0.5 px-2">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col p-4 fixed left-0 top-0 shadow-sm z-50">
            {/* Logo / Branding */}
            <div className="flex items-center gap-2 mb-8 px-4 py-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                    <span className="text-lg font-black text-gray-900 tracking-tight">OCC CATALYST</span>
                    <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter leading-none">Business App</p>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <MenuSection id="overview" label="Performance">
                    <NavItem href="/" icon={LayoutDashboard} label="Home" />
                    <NavItem href="/websites" icon={Globe} label="Websites" />
                    <NavItem href="/reports" icon={Activity} label="Executive Report" />
                </MenuSection>

                <MenuSection id="acquisition" label="Acquisition">
                    <NavItem href="/crm" icon={Users} label="Sales CRM" />
                    <NavItem href="/marketing/email" icon={Mail} label="Email Marketing" />
                    <NavItem href="/marketplace" icon={ShoppingBag} label="Marketplace" />
                </MenuSection>

                <MenuSection id="fulfillment" label="Fulfillment">
                    <NavItem href="/workforce/receptionist" icon={Headphones} label="AI Receptionist" />
                    <NavItem href="/workforce/reputation" icon={CheckCircle2} label="Reputation Mgmt" />
                    <NavItem href="/workforce/content" icon={PenTool} label="Content Strategy" />
                </MenuSection>

                <MenuSection id="agency" label="Partner Admin">
                    <NavItem href="/partner" icon={Briefcase} label="Partner Center" />
                    <NavItem href="/settings" icon={Settings} label="Global Settings" />
                </MenuSection>
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto px-4 py-6 border-t border-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">John Doe</p>
                    <p className="text-[10px] text-gray-500 truncate">john.doe@marketing.com</p>
                </div>
                <button className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    );
}
