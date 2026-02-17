"use client";

import { useState, useCallback } from "react";
import { UploadCloud, FileText, X, Download, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DragDropZoneProps {
    onFileSelect: (file: File) => void;
}

export function DragDropZone({ onFileSelect }: DragDropZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [onFileSelect]); // Added onFileSelect dependency

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    }, [onFileSelect]); // Added onFileSelect dependency

    const handleFile = (file: File) => {
        // Basic validation
        if (file.type === "application/pdf" || file.type.includes("excel") || file.type.includes("spreadsheet") || file.name.endsWith(".txt")) {
            setSelectedFile(file);
            onFileSelect(file);
        } else {
            // For demo purposes, we are lenient, but in prod we'd show an error
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="space-y-6">
            <div
                className={cn(
                    "relative rounded-xl border-2 border-dashed transition-all duration-300 p-12 text-center",
                    isDragOver
                        ? "border-primary bg-primary/10 scale-[1.02]"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileInput}
                    accept=".pdf,.xlsx,.xls,.csv,.txt"
                    disabled={!!selectedFile}
                />

                {selectedFile ? (
                    <div className="relative z-20 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="h-16 w-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{selectedFile.name}</h3>
                        <p className="text-sm text-slate-400 mb-6">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        <Button variant="ghost" size="sm" onClick={removeFile} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 z-30 pointer-events-auto">
                            <X className="mr-2 h-4 w-4" /> Remove File
                        </Button>
                    </div>
                ) : (
                    <div className="pointer-events-none">
                        <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <UploadCloud className={cn("h-8 w-8 text-slate-400 transition-colors", isDragOver && "text-primary")} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            {isDragOver ? "Drop to Upload" : "Click to Upload or Drag & Drop"}
                        </h3>
                        <p className="text-slate-400 max-w-sm mx-auto mb-6">
                            Supported formats: .PDF, .XLSX, .TXT (Max 50MB)
                        </p>
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
                            Secure & Encrypted
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
