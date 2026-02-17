export type ReportData = {
    id: string;
    companyName: string;
    location: string;
    score: number;
    verdict: "VERIFIED" | "SUSPICIOUS" | "CRITICAL";
    flag: string;
    riskLevel: string;
    missingFields: number;
    confidence: number;
    lies: number;
    comparisonItems: any[];
    summary: string;
};

export const DEMO_DATA: Record<string, ReportData> = {
    "vietnam": {
        id: "VN-2026-8821",
        companyName: "Thai Nguyen Textiles",
        location: "Hanoi, Vietnam",
        flag: "🇻🇳",
        score: 47,
        verdict: "SUSPICIOUS",
        riskLevel: "High Risk",
        missingFields: 2,
        confidence: 98.5,
        lies: 3,
        comparisonItems: [
            { label: "Company Name", sourceValue: "Thai Nguyen Textiles", targetValue: "Thai Nguyen Textiles", status: "MATCH" },
            { label: "Workers", sourceValue: "500 công nhân", targetValue: "500 employees", status: "MATCH" },
            { label: "Wage", sourceValue: "8,500,000 VND", targetValue: "€330", status: "MISMATCH" },
            { label: "Overtime", sourceValue: "0 giờ", targetValue: "0 hours", status: "MATCH" },
            { label: "Subcontractors", sourceValue: "Không có", targetValue: "❌ MISSING", status: "MISSING" },
            { label: "Safety Comm.", sourceValue: "Không vi phạm", targetValue: "None reported", status: "MATCH" },
        ],
        summary: "The verification of **Thai Nguyen Textiles** has flagged **3 critical discrepancies** between the submitted report (Vietnam MOLISA format) and official government databases."
    },
    "india": {
        id: "IND-2026-9912",
        companyName: "Bangalore Garments Pvt Ltd",
        location: "Bangalore, India",
        flag: "🇮🇳",
        score: 94,
        verdict: "VERIFIED",
        riskLevel: "Low Risk",
        missingFields: 0,
        confidence: 99.9,
        lies: 0,
        comparisonItems: [
            { label: "Company Name", sourceValue: "Bangalore Garments", targetValue: "Bangalore Garments", status: "MATCH" },
            { label: "Workers", sourceValue: "1200", targetValue: "1200", status: "MATCH" },
            { label: "Wage (min)", sourceValue: "₹18,000", targetValue: "$215", status: "MATCH" },
            { label: "Provident Fund", sourceValue: "Compliant", targetValue: "Verified", status: "MATCH" },
            { label: "Overtime", sourceValue: "Paid (2x)", targetValue: "Paid (2x)", status: "MATCH" },
            { label: "Fire Safety", sourceValue: "Valid NOC", targetValue: "Valid", status: "MATCH" },
        ],
        summary: "The verification of **Bangalore Garments Pvt Ltd** matches **100% of EPFO and Ministry of Corporate Affairs** records. This factory is fully compliant with global standards."
    }
};
