"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Server, Globe, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingOverlayProps {
    onComplete: () => void;
}

const steps = [
    { icon: Server, label: "Scanning Document Structure...", duration: 1500 },
    { icon: Globe, label: "Connecting to ILO & Govt APIs...", duration: 2000 },
    { icon: Search, label: "Cross-referencing Employee Data (EPFO)...", duration: 2000 },
    { icon: Search, label: "Verifying Export Volumes (Customs)...", duration: 1500 },
    { icon: ShieldCheck, label: "Calculating Veritas Score...", duration: 1000 },
];

export function ProcessingOverlay({ onComplete }: ProcessingOverlayProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, steps[currentStep].duration);
            return () => clearTimeout(timer);
        } else {
            // Wait a bit after last step before completing
            const timer = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentStep, onComplete]);

    return (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                <h2 className="text-2xl font-bold text-white text-center mb-8">Verifying Report Integrity</h2>

                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        const isPending = index > currentStep;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center gap-4 transition-all duration-500",
                                    isPending ? "opacity-30 translate-x-4" : "opacity-100 translate-x-0"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300",
                                    isCompleted ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-500" :
                                        isActive ? "bg-primary/20 border-primary/50 text-primary" : "bg-slate-800 border-slate-700 text-slate-500"
                                )}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : isActive ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <step.icon className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className={cn("font-medium text-sm", isActive ? "text-white" : "text-slate-400")}>
                                        {step.label}
                                    </p>
                                    {isActive && (
                                        <div className="h-1 w-24 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-primary animate-progress"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
