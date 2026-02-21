"use client";

import { useEffect, useState } from "react";
import { LieDetector } from "@/components/dashboard/LieDetector";
import { AlertCircle } from "lucide-react";
import { DEMO_DATA, ReportData } from "@/lib/demo-data";

export default function LiesPage() {
    const [data, setData] = useState<ReportData | null>(null);

    useEffect(() => {
        // Try full analysisResult first
        const stored = sessionStorage.getItem("analysisResult");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Only use if it has comparisonItems (our format)
                if (parsed.comparisonItems) {
                    setData(parsed);
                    return;
                }
            } catch { /* fall through */ }
        }
        // Fallback to demo scenario
        const scenario = sessionStorage.getItem("demoScenario") || "vietnam";
        setData(DEMO_DATA[scenario] || DEMO_DATA["vietnam"]);
    }, []);

    const lieCount = data
        ? (data.comparisonItems || []).filter(i => i.status === "MISMATCH").length
        : 0;

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                        Truth Analysis Engine
                    </h1>
                    <p className="text-slate-400">AI-detected discrepancies with high-confidence proof.</p>
                </div>
                {/* Live lie count badge — synced from same data source */}
                <div className={`px-4 py-2 rounded-xl border text-sm font-bold ${lieCount === 0 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                    {lieCount === 0 ? "✓ 0 Lies" : `⚠ ${lieCount} Lie${lieCount > 1 ? "s" : ""} Detected`}
                </div>
            </div>

            {/* LieDetector is now fully data-driven — handles both verified and suspicious/critical */}
            <LieDetector />
        </div>
    );
}
