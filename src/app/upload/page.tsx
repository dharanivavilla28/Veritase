"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropZone } from "@/components/upload/DragDropZone";
import { ProcessingOverlay } from "@/components/upload/ProcessingOverlay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UploadPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleStartVerification = async () => {
        if (!file) return;

        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                // Store the RESULT, not just the scenario name
                sessionStorage.setItem("analysisResult", JSON.stringify(result));
                // Still set scenario for fallback/compatibility with other components if needed
                sessionStorage.setItem("demoScenario", result.flag === "🇻🇳" ? "vietnam" : "india");
            }
        } catch (error) {
            console.error("Verification failed", error);
        }
    };

    const handleVerificationComplete = () => {
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative">
            {isProcessing && <ProcessingOverlay onComplete={handleVerificationComplete} />}

            <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/" className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
                <div className="flex items-center gap-2 text-primary">
                    <Shield className="h-5 w-5" />
                    <span className="font-bold tracking-tight">VERITAS BRIDGE</span>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-4 py-20">
                <div className="max-w-xl w-full space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                            Upload Report
                        </h1>
                        <p className="text-slate-400 text-lg">
                            We'll extract data and cross-reference it with 5+ government databases instantly.
                        </p>
                    </div>

                    <DragDropZone onFileSelect={handleFileSelect} />

                    <div className="flex justify-center pt-4">
                        <Button
                            size="lg"
                            variant="premium"
                            className={cn(
                                "w-full sm:w-auto px-12 h-14 text-lg transition-all duration-300",
                                !file ? "opacity-50 cursor-not-allowed grayscale" : "shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] hover:scale-105"
                            )}
                            disabled={!file}
                            onClick={handleStartVerification}
                        >
                            Verify Report Integrity
                        </Button>
                    </div>

                    <p className="text-center text-xs text-slate-600 mt-8">
                        By uploading, you agree to our Terms of Service. Data is encrypted and deleted after 30 days.
                    </p>
                </div>
            </div>
        </div>
    );
}
