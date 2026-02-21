"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container px-4 md:px-6 mx-auto text-center">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                    Revolutionizing Factory Verification
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white mb-6">
                    Making Honesty <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        Cheaper Than Lies
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Veritas Bridge verifies factory reports using free public data.
                    Zero friction for factories. 100% transparency for brands.
                    Ending modern slavery, one report at a time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link href="/upload">
                        <Button size="lg" variant="premium" className="w-full sm:w-auto text-base h-12 px-8">
                            Start Verification
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            View Live Demo
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Instant Results</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Govt Data Backed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>No Factory Integration</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
