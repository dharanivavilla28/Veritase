"use client";

import { useState } from "react";
import { SupplierCard, SupplierProps } from "@/components/brand/SupplierCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Bell, LayoutGrid, List, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockSuppliers: SupplierProps[] = [
    {
        id: "VN-8821",
        name: "Thai Nguyen Textiles",
        country: "Vietnam",
        score: 47,
        verdict: "SUSPICIOUS",
        lastVerified: "Today",
        flags: 3,
    },
    {
        id: "VN-9942",
        name: "Saigon Garments Ltd",
        country: "Vietnam",
        score: 92,
        verdict: "VERIFIED",
        lastVerified: "2 days ago",
        flags: 0,
    },
    {
        id: "BD-1024",
        name: "Dhaka Knitwear Solutions",
        country: "Bangladesh",
        score: 38,
        verdict: "CRITICAL",
        lastVerified: "Yesterday",
        flags: 5,
    },
    {
        id: "IN-4451",
        name: "Chennai Cottons",
        country: "India",
        score: 88,
        verdict: "VERIFIED",
        lastVerified: "1 week ago",
        flags: 1,
    },
    {
        id: "TR-3321",
        name: "Istanbul Fabrics",
        country: "Turkey",
        score: 76,
        verdict: "SUSPICIOUS",
        lastVerified: "3 days ago",
        flags: 2,
    },
    {
        id: "CN-1102",
        name: "Shenzhen Apparel Co",
        country: "China",
        score: 41,
        verdict: "CRITICAL",
        lastVerified: "5 hours ago",
        flags: 4,
    },
];

export default function BrandDashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("ALL");

    const filteredSuppliers = mockSuppliers.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "ALL" || s.verdict === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-transparent pb-20">
            {/* Navigation Bar */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                            <div className="h-8 w-8 bg-gradient-to-tr from-primary to-blue-600 rounded-lg flex items-center justify-center text-white">
                                V
                            </div>
                            Veritas <span className="text-slate-500 font-normal">Brand Portal</span>
                        </Link>
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                            <span className="text-white">Dashboard</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Suppliers</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Reports</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Integration</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
                            {/* User Avatar Placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-white mb-2">Supplier Overview</h1>
                        <p className="text-slate-400">Manage and verify your supply chain compliance in real-time.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                            <ArrowUpRight className="mr-2 h-4 w-4" /> Add Supplier
                        </Button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search by supplier name, ID, or country..."
                            className="pl-10 bg-slate-900 border-slate-800 focus:border-primary text-slate-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {["ALL", "VERIFIED", "SUSPICIOUS", "CRITICAL"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap",
                                    filter === f
                                        ? "bg-slate-800 border-slate-700 text-white shadow-sm"
                                        : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                        <Button variant="outline" size="icon" className="ml-2 border-slate-800 text-slate-400">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Cards Layout */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredSuppliers.map((supplier) => (
                            <SupplierCard key={supplier.id} supplier={supplier} />
                        ))}
                    </div>

                    {/* Right Sidebar: Alerts */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                                    High Risk Alerts
                                </h3>
                                <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full font-bold">12 New</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { title: "Dhaka Knitwear", msg: "Child labor flags in secondary audit", time: "2h ago" },
                                    { title: "Shenzhen Apparel", msg: "Forced labor score increased to 85%", time: "5h ago" },
                                    { title: "Istanbul Fabrics", msg: "Wage payment discrepancy > 20%", time: "1d ago" },
                                ].map((alert, i) => (
                                    <div key={i} className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{alert.title}</h4>
                                        <p className="text-xs text-slate-400 mt-1">{alert.msg}</p>
                                        <span className="text-[10px] text-slate-600 mt-2 block uppercase tracking-wider">{alert.time}</span>
                                    </div>
                                ))}
                            </div>

                            <Button variant="ghost" className="w-full mt-4 text-xs text-slate-500 hover:text-white">
                                View All Alerts
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl">
                            <h3 className="font-bold text-blue-100 text-sm uppercase tracking-wider mb-1">Supply Chain Health</h3>
                            <div className="text-3xl font-bold mb-4">84% Safe</div>
                            <div className="space-y-2">
                                <div className="h-1.5 bg-blue-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/90 w-[84%]"></div>
                                </div>
                                <p className="text-xs text-blue-200/80 leading-relaxed">
                                    Your supply chain compliance has improved by 12% this month. Good job!
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
