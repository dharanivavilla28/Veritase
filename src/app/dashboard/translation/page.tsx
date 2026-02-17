"use client";

import { useState, useEffect } from "react";
import { ComparisonView } from "@/components/dashboard/ComparisonView";
import { Layers } from "lucide-react";
import { DEMO_DATA } from "@/lib/demo-data";
import { Skeleton } from "@/components/ui/skeleton";

const countries = [
    { code: "EU", name: "European Union" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
];

export default function TranslationPage() {
    const [selectedCountry, setSelectedCountry] = useState("EU");
    const [scenario, setScenario] = useState("vietnam");
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedScenario = sessionStorage.getItem("demoScenario") || "vietnam";
        setScenario(storedScenario);
        const data = DEMO_DATA[storedScenario] || DEMO_DATA["vietnam"];
        setItems(data.comparisonItems);
        setLoading(false);
    }, []);

    if (loading) return <div className="p-8"><Skeleton className="h-64 w-full bg-slate-800" /></div>;

    const activeData = DEMO_DATA[scenario] || DEMO_DATA["vietnam"];

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                        <Layers className="h-8 w-8 text-blue-500" />
                        Translation Hub
                    </h1>
                    <p className="text-slate-400">
                        Comparing <strong>{activeData.companyName}</strong> report against international standards.
                    </p>
                </div>

                {/* Standard Selector */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex gap-1">
                    {countries.map((c) => (
                        <button
                            key={c.code}
                            onClick={() => setSelectedCountry(c.code)}
                            className={`px-3 py-1.5 rounded text-sm font-bold transition-all ${selectedCountry === c.code
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-500 hover:text-white"
                                }`}
                        >
                            {c.code}
                        </button>
                    ))}
                </div>
            </div>

            <ComparisonView
                sourceCountry={activeData.location.split(", ")[1] || "Unknown"}
                targetFormat={selectedCountry === "EU" ? "EU (CSDDD)" : `${countries.find(c => c.code === selectedCountry)?.name} Format`}
                items={items}
            />
        </div>
    );
}
