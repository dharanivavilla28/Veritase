"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // We might need to create this or use styled divs
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight, BarChart3, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface SupplierProps {
    id: string;
    name: string;
    country: string;
    score: number;
    verdict: "VERIFIED" | "SUSPICIOUS" | "CRITICAL";
    lastVerified: string;
    flags: number;
    logoUrl?: string; // Placeholder for logo
}

export function SupplierCard({ supplier }: { supplier: SupplierProps }) {
    const getStatusColor = (verdict: string) => {
        switch (verdict) {
            case "VERIFIED": return "bg-emerald-500 text-emerald-500 border-emerald-500/50";
            case "SUSPICIOUS": return "bg-amber-500 text-amber-500 border-amber-500/50";
            case "CRITICAL": return "bg-red-500 text-red-500 border-red-500/50";
            default: return "bg-slate-500 text-slate-500 border-slate-500/50";
        }
    };

    const statusColor = getStatusColor(supplier.verdict);
    const bgGradient = supplier.verdict === "VERIFIED"
        ? "from-emerald-950/30 to-slate-950/30"
        : supplier.verdict === "SUSPICIOUS"
            ? "from-amber-950/30 to-slate-950/30"
            : "from-red-950/30 to-slate-950/30";

    return (
        <Card className={cn(
            "group relative overflow-hidden border-slate-800 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
            "bg-gradient-to-br backdrop-blur-sm",
            bgGradient
        )}>
            {/* Dynamic Border Glow */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                "bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shimmer"
            )} />

            <div className={cn("absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity", statusColor.split(" ")[1])}>
                {supplier.verdict === "VERIFIED" && <CheckCircle2 className="w-24 h-24" />}
                {supplier.verdict === "SUSPICIOUS" && <AlertTriangle className="w-24 h-24" />}
                {supplier.verdict === "CRITICAL" && <XCircle className="w-24 h-24" />}
            </div>

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xl text-slate-300 shadow-inner">
                            {supplier.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors">
                                {supplier.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin className="h-3 w-3" />
                                {supplier.country}
                            </div>
                        </div>
                    </div>

                    <div className={cn("px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md", statusColor.replace("text-", "bg-opacity-10 text-"))}>
                        {supplier.verdict}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <span className="text-xs text-slate-500 block mb-1">Veritas Score</span>
                        <div className="flex items-end gap-2">
                            <span className={cn("text-2xl font-mono font-bold leading-none", statusColor.split(" ")[1])}>
                                {supplier.score}
                            </span>
                            <span className="text-xs text-slate-600 mb-0.5">/100</span>
                        </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <span className="text-xs text-slate-500 block mb-1">Active Flags</span>
                        <div className="flex items-end gap-2">
                            <span className={cn("text-2xl font-mono font-bold leading-none", supplier.flags > 0 ? "text-white" : "text-slate-500")}>
                                {supplier.flags}
                            </span>
                            <span className="text-xs text-slate-600 mb-0.5">Issues</span>
                        </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <span className="text-xs text-slate-500 block mb-1">Last Checked</span>
                        <div className="flex items-end gap-1">
                            <Clock className="w-4 h-4 text-slate-500 mb-0.5" />
                            <span className="text-sm font-medium text-slate-300 leading-none mb-0.5">
                                {supplier.lastVerified}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 group-hover:text-primary/70 transition-colors">
                        ID: {supplier.id}
                    </span>
                    <Link href="/dashboard">
                        <Button size="sm" variant="ghost" className="text-slate-300 group-hover:text-white group-hover:bg-slate-800">
                            View Full Report <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Progress Bar at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900">
                <div
                    className={cn("h-full transition-all duration-1000", statusColor.split(" ")[0])}
                    style={{ width: `${supplier.score}%` }}
                />
            </div>
        </Card>
    );
}
