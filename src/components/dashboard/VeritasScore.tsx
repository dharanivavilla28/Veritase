import { cn } from "@/lib/utils";

interface VeritasScoreProps {
    score: number;
    verdict: "SAFE" | "SUSPICIOUS" | "CRITICAL" | "VERIFIED";
    className?: string;
}

export function VeritasScore({ score, verdict, className }: VeritasScoreProps) {
    const getColor = () => {
        if (score >= 80) return "bg-emerald-500 text-emerald-500";
        if (score >= 50) return "bg-amber-500 text-amber-500";
        return "bg-red-500 text-red-500";
    };

    const colorClass = getColor();
    const widthPercentage = `${Math.min(100, Math.max(0, score))}%`;

    return (
        <div className={cn("p-6 bg-slate-900/50 border border-slate-800 rounded-xl", className)}>
            <div className="text-center mb-6">
                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Veritas Score</div>
                <div className="text-6xl font-heading font-bold text-white mb-2">{score}<span className="text-2xl text-slate-500">/100</span></div>
                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-opacity-10", colorClass.replace('text-', 'bg-'))}>
                    {verdict === "SUSPICIOUS" || verdict === "CRITICAL" ? "❌" : "✅"} {verdict}
                </div>
            </div>

            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                {/* Background segments */}
                <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full border-r border-slate-900 bg-red-500/20"></div>
                    <div className="w-3/10 h-full border-r border-slate-900 bg-amber-500/20"></div>
                    <div className="w-1/5 h-full bg-emerald-500/20"></div>
                </div>

                {/* Fill bar */}
                <div
                    className={cn("h-full transition-all duration-1000 ease-out relative", colorClass.split(' ')[0])}
                    style={{ width: widthPercentage }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"></div>
                </div>
            </div>

            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>0</span>
                <span>50</span>
                <span>100</span>
            </div>

            {(verdict === "SUSPICIOUS" || verdict === "CRITICAL") && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start gap-3">
                    <span className="text-lg">⚠️</span>
                    <div>
                        <span className="font-bold block mb-1">VERDICT: LIES DETECTED</span>
                        This report contains critical discrepancies compared to official records.
                    </div>
                </div>
            )}
        </div>
    );
}
