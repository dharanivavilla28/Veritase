"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShieldCheck, Layers, AlertCircle, Database, ArrowLeft, LogOut } from "lucide-react";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: ShieldCheck },
    { name: "Translation Hub", href: "/dashboard/translation", icon: Layers },
    { name: "Lie Detector", href: "/dashboard/lies", icon: AlertCircle },
    { name: "Evidence Vault", href: "/dashboard/evidence", icon: Database },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex flex-col w-64 bg-slate-900/30 backdrop-blur-md border-r border-white/5 min-h-screen sticky top-0">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-600 w-8 h-8 rounded-lg flex items-center justify-center text-slate-900">
                        V
                    </span>
                    Veritas Bridge
                </Link>
            </div>

            <div className="flex-1 px-4 space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                    Report Validation
                </div>
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-slate-800 text-white shadow-sm border border-slate-700/50"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-slate-500")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-slate-400 mb-1">Target Format</div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                        🇪🇺 EU CSDDD
                    </div>
                </div>
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-2 transition-colors">
                    <LogOut className="h-4 w-4" /> Exit Report
                </Link>
            </div>
        </div>
    );
}
