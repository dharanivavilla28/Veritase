"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, AlertCircle, ExternalLink, Globe, Building2, TrendingUp, CheckCircle2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_DATA, ReportData } from "@/lib/demo-data";

// Maps a comparisonItem label to a rich proof object
function buildProof(label: string, sourceValue: string, targetValue: string, scenario: string) {
    const proofMap: Record<string, { title: string; source: string; confidence: number; type: "GOVT" | "BANK" | "SATELLITE" | "ANALYSIS"; description: string; evidenceShort: string }> = {
        "Total Workers": { title: "EPFO / GOVT WORKER REGISTRY", source: "epfindia.gov.in/verify/" + scenario.toUpperCase(), confidence: 99, type: "GOVT", description: `Official government payroll database shows ${targetValue}. Factory declared ${sourceValue}. The gap indicates ghost employees or unregistered labour.`, evidenceShort: "Government Portal Screenshot" },
        "Avg Wage": { title: "ILO WAGE BENCHMARK + BANK DATA", source: "ILO Sector Benchmark + Partner Bank Records", confidence: 92, type: "BANK", description: `Bank disbursement records and ILO sector benchmarks confirm average payout of ${targetValue}. Factory declared ${sourceValue} — a significant underpayment.`, evidenceShort: "ILO Wage Report + Bank CSV" },
        "Working Hours": { title: "PRODUCTION LOG / SATELLITE", source: "ImportGenius + Google Earth Engine", confidence: 95, type: "SATELLITE", description: `Production logs and satellite light-data detected activity of ${targetValue}. Factory declared only ${sourceValue}, indicating concealed overtime.`, evidenceShort: "Satellite Imagery + Import Logs" },
        "Declared Workers": { title: "SGK / SOCIAL SECURITY REGISTRY", source: "sgk.gov.tr/verify/" + scenario.toUpperCase(), confidence: 97, type: "GOVT", description: `SGK (Turkish Social Security) records show ${targetValue}. Factory declared ${sourceValue} — indicating unregistered seasonal workers.`, evidenceShort: "SGK Portal Screenshot" },
        "Worker Count": { title: "BGMEA / DIFE WORKER REGISTRY", source: "bgmea.com.bd/verify/" + scenario.toUpperCase(), confidence: 99, type: "GOVT", description: `BGMEA and DIFE cross-check shows ${targetValue}. Factory declared ${sourceValue} — gap indicates falsified headcount.`, evidenceShort: "BGMEA Registry Screenshot" },
        "Under-18 Workers": { title: "THIRD-PARTY CHILD LABOUR AUDIT", source: "dife.gov.bd/audit/2026", confidence: 96, type: "GOVT", description: `Third-party audit and factory floor inspection detected ${targetValue}. Factory declared ${sourceValue} — a direct violation of Bangladesh Labour Act 2006.`, evidenceShort: "Audit Report Document" },
        "Workforce Count": { title: "SOCIAL INSURANCE RECORDS", source: "China SAMR + Insurance Registry", confidence: 98, type: "GOVT", description: `China social insurance records show only ${targetValue} enrolled. Factory declared ${sourceValue}, indicating ~24% of workforce is unregistered.`, evidenceShort: "Insurance Registry Extract" },
        "Avg Floor Wage": { title: "BANK TRANSFER RECORDS", source: "Shenzhen Payroll Bank Data (Partner)", confidence: 94, type: "BANK", description: `Bank transfer records confirm average floor worker payout of ${targetValue}. Factory declared ${sourceValue} — a 45% discrepancy.`, evidenceShort: "Bank Transfer CSV Export" },
        "Xinjiang Workers": { title: "UFLPA FORCED LABOUR ALERT", source: "CBP.gov / UFLPA Entity List", confidence: 99, type: "GOVT", description: `${sourceValue} — This constitutes a direct violation of the US Uyghur Forced Labour Prevention Act (UFLPA) and EU CSDDD. Goods are presumptively banned from US import.`, evidenceShort: "CBP WRO Alert Document" },
    };

    return proofMap[label] ?? {
        title: `VERIFICATION: ${label.toUpperCase()}`,
        source: "Veritas Bridge Cross-Reference Engine",
        confidence: 90,
        type: "ANALYSIS" as const,
        description: `Declared: ${sourceValue}. Verified value from government/third-party databases: ${targetValue}.`,
        evidenceShort: "Cross-Reference Analysis Report"
    };
}

export function LieDetector() {
    const [expandedId, setExpandedId] = useState<number | null>(1);
    const [data, setData] = useState<ReportData | null>(null);

    useEffect(() => {
        // 1. Try reading the full analysis result
        const stored = sessionStorage.getItem("analysisResult");
        if (stored) {
            try {
                setData(JSON.parse(stored));
                return;
            } catch { /* fall through */ }
        }
        // 2. Otherwise, use the demo scenario
        const scenario = sessionStorage.getItem("demoScenario") || "vietnam";
        setData(DEMO_DATA[scenario] || DEMO_DATA["vietnam"]);
    }, []);

    if (!data) return null;

    // Build lie items from comparisonItems — only MISMATCHes are "lies"
    const scenario = sessionStorage.getItem("demoScenario") || "vietnam";
    const lies = (data.comparisonItems || [])
        .filter(item => item.status === "MISMATCH")
        .map((item, i) => ({
            id: i + 1,
            title: item.label.toUpperCase() + " DISCREPANCY",
            severity: "CRITICAL" as const,
            reportValue: item.sourceValue,
            truthValue: item.targetValue,
            sourceText: "Report Claims",
            truthSource: "Truth (Govt/DB Verified)",
            proof: buildProof(item.label, item.sourceValue, item.targetValue, scenario),
        }));

    const missingItems = (data.comparisonItems || []).filter(item => item.status === "MISSING");
    const totalLies = lies.length;

    const verdictColor = data.verdict === "VERIFIED" ? "emerald" : data.verdict === "SUSPICIOUS" ? "amber" : "red";
    const verdictBg = data.verdict === "VERIFIED" ? "bg-emerald-500/10 border-emerald-500/20" : data.verdict === "SUSPICIOUS" ? "bg-amber-500/10 border-amber-500/20" : "bg-red-500/10 border-red-500/20";
    const verdictText = data.verdict === "VERIFIED" ? "text-emerald-400" : data.verdict === "SUSPICIOUS" ? "text-amber-400" : "text-red-400";

    return (
        <div className="space-y-4">
            {/* Verdict banner */}
            <div className={cn("flex items-center justify-between p-4 rounded-lg border", verdictBg)}>
                <div className="flex items-center gap-3">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", data.verdict === "VERIFIED" ? "bg-emerald-500" : "bg-red-500 animate-pulse")}>
                        {data.verdict === "VERIFIED"
                            ? <CheckCircle2 className="h-5 w-5 text-white" />
                            : <AlertCircle className="h-5 w-5 text-white" />
                        }
                    </div>
                    <div>
                        <h3 className={cn("font-bold text-lg", verdictText)}>
                            VERDICT: {data.verdict}
                            {totalLies > 0 ? ` — ${totalLies} Lie${totalLies > 1 ? "s" : ""} Detected` : " — No Discrepancies"}
                        </h3>
                        <p className={cn("text-sm opacity-70", verdictText)}>
                            {totalLies > 0
                                ? "Review the discrepancies found against official government records."
                                : "All reported data matches verified government & public records."}
                        </p>
                    </div>
                </div>
                <div className={cn("text-3xl font-mono font-bold", verdictText)}>{data.score}/100</div>
            </div>

            {/* VERIFIED: Clean state */}
            {totalLies === 0 && (
                <Card className="border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                    <h4 className="text-white font-bold text-lg mb-2">All Clear — Zero Discrepancies</h4>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                        Every data point in this report was cross-referenced against {data.confidence}% confidence government, bank, and trade data. No lies were detected.
                    </p>
                </Card>
            )}

            {/* Lie items — only MISMATCHes */}
            {lies.map((lie) => (
                <Card key={lie.id} className={cn("border-slate-800 bg-slate-900/40 overflow-hidden transition-all duration-300", expandedId === lie.id ? "border-red-500/30 ring-1 ring-red-500/20" : "")}>
                    <div className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => setExpandedId(expandedId === lie.id ? null : lie.id)}>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-heading font-bold text-slate-200 text-lg flex items-center gap-2">
                                <span className="text-red-500">LIE #{lie.id}:</span> {lie.title}
                            </h4>
                            <Button variant="ghost" size="sm" className="text-slate-400">
                                {expandedId === lie.id ? "Hide Proof" : "Show Proof"}
                                {expandedId === lie.id ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:gap-12">
                            <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                                <span className="block text-slate-500 text-xs uppercase mb-1">{lie.sourceText}</span>
                                <span className="text-red-400 font-mono font-bold text-xl line-through decoration-slice">{lie.reportValue}</span>
                            </div>
                            <div className="bg-emerald-950/20 p-3 rounded border border-emerald-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-1"><CheckCircle2 className="h-4 w-4 text-emerald-500/50" /></div>
                                <span className="block text-emerald-500/70 text-xs uppercase mb-1">{lie.truthSource}</span>
                                <span className="text-emerald-400 font-mono font-bold text-xl">{lie.truthValue}</span>
                            </div>
                        </div>
                    </div>

                    {expandedId === lie.id && (
                        <div className="border-t border-slate-800/50 bg-slate-950/30 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                            <div className="bg-slate-900 rounded-lg border border-slate-800 p-5 shadow-lg">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                                    <h5 className="font-bold text-slate-200 flex items-center gap-2">
                                        {lie.proof.type === "GOVT" && <Building2 className="h-4 w-4 text-emerald-500" />}
                                        {lie.proof.type === "SATELLITE" && <Globe className="h-4 w-4 text-blue-500" />}
                                        {lie.proof.type === "BANK" && <TrendingUp className="h-4 w-4 text-amber-500" />}
                                        {lie.proof.type === "ANALYSIS" && <ExternalLink className="h-4 w-4 text-slate-400" />}
                                        PROOF: {lie.proof.title}
                                    </h5>
                                    <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                        CONFIDENCE: {lie.proof.confidence}%
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="font-mono text-sm text-slate-300">
                                            <span className="text-slate-500 block text-xs uppercase mb-1">Analysis</span>
                                            {lie.proof.description}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 pt-2">
                                            <ExternalLink className="h-3 w-3" />
                                            Source: <span className="text-blue-400 underline decoration-dotted ml-1">{lie.proof.source}</span>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded border border-slate-800 flex flex-col items-center justify-center p-4 text-center">
                                        {lie.proof.type === "BANK" ? <TrendingUp className="h-8 w-8 text-slate-600 mb-2" /> : <Building2 className="h-8 w-8 text-slate-600 mb-2" />}
                                        <span className="text-xs text-slate-500 font-medium block mb-2">{lie.proof.evidenceShort}</span>
                                        <Button variant="outline" size="sm" className="h-7 text-xs border-slate-700 w-full" onClick={() => alert("Evidence file download would open here.")}>
                                            <Download className="mr-2 h-3 w-3" /> View Evidence
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            ))}

            {/* Missing fields summary */}
            {missingItems.length > 0 && (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="font-bold text-amber-400 text-sm mb-2">⚠ {missingItems.length} Mandatory Field{missingItems.length > 1 ? "s" : ""} Missing</h4>
                    <div className="flex flex-wrap gap-2">
                        {missingItems.map((m, i) => (
                            <span key={i} className="text-xs bg-amber-500/10 text-amber-300 px-2 py-1 rounded-full border border-amber-500/20">{m.label}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Evidence package footer */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between mt-6">
                <div>
                    <h4 className="font-bold text-white text-sm">EVIDENCE PACKAGE</h4>
                    <p className="text-xs text-slate-500">Includes {totalLies} discrepancy reports, {missingItems.length} gap analyses, and full cross-reference logs.</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white" onClick={() => alert("Downloading full evidence package as .zip...")}>
                    <Download className="mr-2 h-4 w-4" /> Download All (.zip)
                </Button>
            </div>
        </div>
    );
}
