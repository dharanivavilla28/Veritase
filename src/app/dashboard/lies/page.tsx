"use client";

import { useEffect, useState } from "react";
import { LieDetector } from "@/components/dashboard/LieDetector";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { DEMO_DATA } from "@/lib/demo-data";

export default function LiesPage() {
    const [scenario, setScenario] = useState("vietnam");

    useEffect(() => {
        const storedScenario = sessionStorage.getItem("demoScenario") || "vietnam";
        setScenario(storedScenario);
    }, []);

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    Truth Analysis Engine
                </h1>
                <p className="text-slate-400">AI-detected discrepancies with high-confidence proof.</p>
            </div>

            {/* If scenario is "india" (verified), show success message instead of lies */}
            {scenario === "india" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-12 text-center">
                    <div className="h-20 w-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Discrepancies Detected</h2>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        Our AI has cross-referenced the report with EPFO, MCA, and GST databases. All data points match official government records.
                    </p>
                </div>
            ) : (
                <LieDetector />
            )}
        </div>
    );
}
