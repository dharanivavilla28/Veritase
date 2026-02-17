import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, FileSearch, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "1. Upload Report",
        description: "Drag and drop your existing factory audit report (PDF/Excel). No manual entry required.",
    },
    {
        icon: FileSearch,
        title: "2. Automatic Verification",
        description: "Our AI cross-references report data with 5+ government databases (EPFO, MCA, GST).",
    },
    {
        icon: CheckCircle2,
        title: "3. Get Verified Score",
        description: "Receive a Veritas Score (0-100). Share your verified status with brands instantly.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] opacity-20" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] opacity-20" />
            </div>

            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Three simple steps to prove your factory's integrity. Fast, secure, and undeniable.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="h-24 w-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-300 relative z-10">
                                <step.icon className="h-10 w-10 text-slate-300 group-hover:text-primary transition-colors" />
                                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-slate-400 max-w-xs text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
