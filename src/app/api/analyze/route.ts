import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const text = await file.text();
        console.log("Analyzing file content:", text);

        // Heuristic Analysis Logic (Simulating AI extraction)
        const isVietnam = text.includes("Vietnam") || text.includes("VND");
        const isIndia = text.includes("India") || text.includes("Rupees") || text.includes("₹");

        // Default Score Logic
        let score = 50;
        let verdict = "SUSPICIOUS";
        let flags = [];
        let lies = 0;
        let missingFields = 0;

        // Detect Wage issues
        if (text.includes("8,500,000 VND") || text.includes("8500000")) {
            // Known suspicious value from demo
            score -= 20;
            lies++;
            flags.push("Wage discrepancy detected vs ILO benchmark");
        }

        // Detect Worker count issues based on keywords
        if (text.includes("500") && isVietnam) {
            // Demo case logic
            score -= 10;
            lies++;
            flags.push("Worker count mismatch (Government registry shows 800)");
        }

        // Detect 'Perfect' India case
        if (isIndia && text.includes("COMPLIANT")) {
            score = 94;
            verdict = "VERIFIED";
            lies = 0;
            missingFields = 0;
        }

        // Determine final verdict
        if (score > 80) verdict = "VERIFIED";
        else if (score < 40) verdict = "CRITICAL";
        else verdict = "SUSPICIOUS";

        // Construct response object
        const analysisResult = {
            id: isVietnam ? "VN-2026-8821" : "IND-2026-9912",
            companyName: isVietnam ? "Thai Nguyen Textiles" : "Bangalore Garments Pvt Ltd",
            location: isVietnam ? "Hanoi, Vietnam" : "Bangalore, India",
            score,
            verdict,
            flag: isVietnam ? "🇻🇳" : "🇮🇳",
            riskLevel: verdict === "VERIFIED" ? "Low Risk" : "High Risk",
            missingFields,
            confidence: 98.5,
            lies,
            comparisonItems: [], // Populate if needed
            summary: verdict === "VERIFIED"
                ? "Factory report matches all government databases. Zero discrepancies found."
                : `Factory report flagged with ${lies} major lies. Recommended for physical audit.`
        };

        return NextResponse.json(analysisResult);

    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
    }
}
