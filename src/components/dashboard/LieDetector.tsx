import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, AlertCircle, ExternalLink, Globe, Building2, TrendingUp, Search, Download, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Proof {
    title: string;
    source: string;
    confidence: number;
    description: string;
    type: "GOVT" | "SATELLITE" | "BANK" | "ANALYSIS";
    evidenceShort?: string;
    visualType?: "SCREENSHOT" | "GRAPH" | "MAP";
}

interface LieItem {
    id: number;
    title: string;
    severity: "CRITICAL" | "WARNING";
    reportValue: string;
    truthValue: string;
    sourceText: string;
    truthSource: string;
    proofs: Proof[];
}

const mockLies: LieItem[] = [
    {
        id: 1,
        title: "WORKER COUNT LIE",
        severity: "CRITICAL",
        reportValue: "500",
        truthValue: "200",
        sourceText: "Report claims",
        truthSource: "Truth (EPFO Data)",
        proofs: [
            {
                title: "EPFO INDIA DATABASE RECORD",
                source: "epfindia.gov.in/verify/VN123456",
                confidence: 99,
                type: "GOVT",
                visualType: "SCREENSHOT",
                description: "Official government record shows only 200 active contributors for Jan 2026. This indicates 300 undeclared workers or ghost employees.",
                evidenceShort: "Screenshot of EPFO Portal Results"
            }
        ]
    },
    {
        id: 2,
        title: "WAGE PAYMENT LIE",
        severity: "CRITICAL",
        reportValue: "$400/mo",
        truthValue: "$250/mo",
        sourceText: "Report claims",
        truthSource: "Truth (ILO + Bank)",
        proofs: [
            {
                title: "WAGE TREND ANALYSIS",
                source: "ILO Benchmark + Partner Bank Records",
                confidence: 85,
                type: "BANK",
                visualType: "GRAPH",
                description: "Bank withdrawal patterns show average disbursement of $250/worker, significantly lower than the claimed $400. Matches ILO minimum wage floor but not the report.",
                evidenceShort: "Line graph showing 6-month wage trend"
            }
        ]
    },
    {
        id: 3,
        title: "EXPORT VALUE LIE",
        severity: "CRITICAL",
        reportValue: "$2M/yr",
        truthValue: "$5.2M/yr",
        sourceText: "Report claims",
        truthSource: "Truth (Vietnam Customs)",
        proofs: [
            {
                title: "VIETNAM CUSTOMS DECLARATION",
                source: "customs.gov.vn/export/VN123456",
                confidence: 98,
                type: "GOVT",
                visualType: "SCREENSHOT",
                description: "Customs database reveals total export value of $5.2M in 2025. The factory underreported by >60%, likely to avoid tax or hide production capacity.",
                evidenceShort: "Screenshot of Customs Portal Export Data"
            }
        ]
    }
];

export function LieDetector() {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-red-400 font-bold text-lg">VERDICT: SUSPICIOUS - 3 Lies Detected</h3>
                        <p className="text-red-300/70 text-sm">Review the discrepancies found against official government records.</p>
                    </div>
                </div>
            </div>

            {mockLies.map((lie) => (
                <Card key={lie.id} className={cn("border-slate-800 bg-slate-900/40 overflow-hidden transition-all duration-300", expandedId === lie.id ? "border-red-500/30 ring-1 ring-red-500/20" : "")}>
                    <div
                        className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                        onClick={() => toggleExpand(lie.id)}
                    >
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
                                <span className="text-red-400 font-mono font-bold text-xl decoration-slice line-through">{lie.reportValue}</span>
                            </div>
                            <div className="bg-emerald-950/20 p-3 rounded border border-emerald-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-1">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500/50" />
                                </div>
                                <span className="block text-emerald-500/70 text-xs uppercase mb-1">{lie.truthSource}</span>
                                <span className="text-emerald-400 font-mono font-bold text-xl">{lie.truthValue}</span>
                            </div>
                        </div>
                    </div>

                    {expandedId === lie.id && (
                        <div className="border-t border-slate-800/50 bg-slate-950/30 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                            {lie.proofs.map((proof, idx) => (
                                <div key={idx} className="bg-slate-900 rounded-lg border border-slate-800 p-5 shadow-lg">
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                                        <h5 className="font-bold text-slate-200 flex items-center gap-2">
                                            {proof.type === "GOVT" && <Building2 className="h-4 w-4 text-emerald-500" />}
                                            {proof.type === "SATELLITE" && <Globe className="h-4 w-4 text-blue-500" />}
                                            {proof.type === "BANK" && <TrendingUp className="h-4 w-4 text-amber-500" />}
                                            PROOF: {proof.title}
                                        </h5>
                                        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                            CONFIDENCE: {proof.confidence}%
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2 space-y-4">
                                            <div className="font-mono text-sm text-slate-300">
                                                <span className="text-slate-500 block text-xs uppercase mb-1">Analysis</span>
                                                {proof.description}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                                                <div className="flex items-center gap-1">
                                                    <ExternalLink className="h-3 w-3" />
                                                    Source: <span className="text-blue-400 underline decoration-dotted">{proof.source}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-black/40 rounded border border-slate-800 flex flex-col items-center justify-center p-4 text-center">
                                            {proof.visualType === "SCREENSHOT" ? <ExternalLink className="h-8 w-8 text-slate-600 mb-2" /> : <TrendingUp className="h-8 w-8 text-slate-600 mb-2" />}
                                            <span className="text-xs text-slate-500 font-medium block mb-2">{proof.evidenceShort}</span>
                                            <Button variant="outline" size="sm" className="h-7 text-xs border-slate-700 w-full">
                                                <Download className="mr-2 h-3 w-3" /> View Evidence
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            ))}

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between mt-6">
                <div>
                    <h4 className="font-bold text-white text-sm">EVIDENCE PACKAGE</h4>
                    <p className="text-xs text-slate-500">Includes 5 screenshots, 2 csv files, and analysis report.</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                    <Download className="mr-2 h-4 w-4" /> Download All (.zip)
                </Button>
            </div>
        </div>
    );
}
