"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple demo auth
        if (email && password) {
            document.cookie = "auth=true; path=/";
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border-slate-800">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-blue-500" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-white">Veritas Bridge Login</CardTitle>
                    <CardDescription className="text-center text-slate-400">
                        Enter your credentials to access the verification portal.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@veritas.com"
                                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="bg-slate-950 border-slate-800 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
