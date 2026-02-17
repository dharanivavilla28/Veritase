"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Brand Portal", href: "/brand" },
    { name: "Upload Report", href: "/upload" },
];

export function GlobalNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Simple check for auth cookie
        const checkAuth = () => {
            const auth = document.cookie.includes('auth=true');
            setIsLoggedIn(auth);
        };

        checkAuth();
        // Listen for storage changes if we used that, but interval is easier for this demo
        const interval = setInterval(checkAuth, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        setIsLoggedIn(false);
        router.push("/login");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <nav className="border-b border-white/5 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500 blur opacity-20 group-hover:opacity-40 transition-opacity rounded-lg"></div>
                        <span className="relative bg-gradient-to-br from-amber-300 to-amber-500 w-9 h-9 rounded-lg flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 text-lg">
                            V
                        </span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors flex items-center gap-1">
                        Veritas<span className="text-amber-400">Bridge</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-white",
                                pathname === item.href ? "text-white" : "text-slate-400"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex gap-3">
                    {isLoggedIn ? (
                        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800" onClick={handleLogin}>
                            Login
                        </Button>
                    )}

                    <Button className="bg-primary hover:bg-blue-600 text-white" asChild>
                        <Link href="/upload">Get Verified</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
