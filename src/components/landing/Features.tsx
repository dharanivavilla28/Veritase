import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, FileCheck, Coins, Globe, Flag, BarChart3 } from "lucide-react";

const features = [
    {
        icon: Database,
        title: "100% Free Public Data",
        description: "We use APIs from ILO, Indian Govt Portals (EPFO, MCA), and UN Comtrade. No expensive proprietary data needed.",
    },
    {
        icon: FileCheck,
        title: "Zero Factory Friction",
        description: "Factories don't need to change anything. We analyze the reports they already file to the government.",
    },
    {
        icon: Coins,
        title: "Honesty is Cheaper",
        description: "Faling a report costs $500 + risk of fine. Veritas costs $300 and guarantees a passing score if honest.",
    },
    {
        icon: Flag,
        title: "India First Approach",
        description: "Starting with India's 10,000+ export factories using local data sources like MCA and GST portals.",
    },
    {
        icon: BarChart3,
        title: "Beautiful Scorecards",
        description: "Visual gauge charts and PDF reports that factory owners can proudly share with brands.",
    },
    {
        icon: Globe,
        title: "Global Scalability",
        description: "Built on ILO standards. Once proven in India, the same API-first model scales to 50+ countries.",
    },
];

export function Features() {
    return (
        <section className="py-20 bg-slate-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        Why Veritas Wins
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        The traditional audit model is broken. We fixed it by changing the incentives and using technology smartly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-slate-800 bg-slate-900/60 hover:border-amber-500/30 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                                    <feature.icon className="h-6 w-6 text-amber-500" />
                                </div>
                                <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-slate-400 text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
