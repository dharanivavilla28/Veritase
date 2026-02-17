"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Download, FileText, FileSpreadsheet, Image as ImageIcon } from "lucide-react";

export default function EvidencePage() {
    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                    <Database className="h-8 w-8 text-slate-500" />
                    Evidence Vault
                </h1>
                <p className="text-slate-400">Raw data logs, screenshots, and original documents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                            <FileText className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Verification Log</h3>
                            <p className="text-xs text-slate-500">JSON • 1.2 MB</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full border-slate-700">Download</Button>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                            <FileSpreadsheet className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Wage Data (ILO)</h3>
                            <p className="text-xs text-slate-500">CSV • 450 KB</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full border-slate-700">Download</Button>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                            <ImageIcon className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Satellite Config</h3>
                            <p className="text-xs text-slate-500">GeoJSON • 8.5 MB</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full border-slate-700">Download</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
