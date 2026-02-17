import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight">
                        Ready to Prove Your Integrity?
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Join the movement of honest factories. Get your Veritas Score today and stand out to global brands.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" variant="premium" className="w-full sm:w-auto text-lg h-14 px-10 rounded-full">
                            Get Verified Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-10 rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            Contact Sales
                        </Button>
                    </div>

                    <p className="text-sm text-slate-500 pt-8">
                        No credit card required for initial report scan.
                    </p>
                </div>
            </div>
        </section>
    );
}
