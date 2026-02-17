import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Check, X, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComparisonItem {
    label: string;
    sourceValue: string;
    targetValue: string;
    status: "MATCH" | "MISMATCH" | "MISSING" | "WARNING";
}

interface ComparisonViewProps {
    items: ComparisonItem[];
    sourceCountry: string;
    targetFormat: string;
}

export function ComparisonView({ items, sourceCountry, targetFormat }: ComparisonViewProps) {
    return (
        <Card className="border-slate-800 bg-slate-900/40">
            <CardHeader className="pb-4 border-b border-slate-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-slate-200 flex items-center gap-2">
                        <ArrowLeftRight className="h-5 w-5 text-primary" />
                        Side-by-Side Comparison
                    </CardTitle>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="h-8 border-slate-700 text-xs">
                            <Download className="mr-2 h-3 w-3" /> {sourceCountry}
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 border-slate-700 text-xs">
                            <Download className="mr-2 h-3 w-3" /> {targetFormat}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-3 bg-slate-950/50 text-xs font-semibold uppercase text-slate-500 tracking-wider py-2 px-4 border-b border-slate-800">
                    <div>Field</div>
                    <div>SOURCE ({sourceCountry.toUpperCase()})</div>
                    <div>TARGET ({targetFormat.toUpperCase()})</div>
                </div>
                <div className="divide-y divide-slate-800/50">
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 py-3 px-4 text-sm group hover:bg-slate-800/30 transition-colors">
                            <div className="font-medium text-slate-300 flex items-center gap-2">
                                {item.status === "MISMATCH" && <X className="h-3 w-3 text-red-500" />}
                                {item.status === "MISSING" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                                {item.status === "MATCH" && <Check className="h-3 w-3 text-emerald-500" />}
                                {item.label}
                            </div>
                            <div className={cn("text-slate-400 truncate pr-2", item.status === "MISMATCH" && "text-red-400/70")}>
                                {item.sourceValue}
                            </div>
                            <div className={cn("text-slate-200 font-mono",
                                item.status === "MISMATCH" && "text-emerald-400",
                                item.status === "MISSING" && "text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded w-fit"
                            )}>
                                {item.targetValue}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-amber-500/5 border-t border-slate-800/50 text-sm text-amber-200/80 flex gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                        <span className="font-bold block text-amber-400 mb-1">⚠️ GAP ANALYSIS: 2 fields missing for EU format</span>
                        <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
                            <li>Subcontractor list (REQUIRED for CSDDD compliance)</li>
                            <li>Risk assessment (REQUIRED)</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
