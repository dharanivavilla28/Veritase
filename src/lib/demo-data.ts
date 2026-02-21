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
    comparisonItems: { label: string; sourceValue: string; targetValue: string; status: "MATCH" | "MISMATCH" | "MISSING" }[];
    summary: string;
};

/**
 * DEMO DATA - Score/Lies/Missing Fields are logically correlated:
 *   VERIFIED   (score 80-100): lies = 0,   missingFields = 0-1
 *   SUSPICIOUS (score 40-79):  lies = 2-4, missingFields = 2-4
 *   CRITICAL   (score 0-39):   lies = 5+,  missingFields = 4+
 *
 * Score = 100 - (lies * 12) - (missingFields * 5) roughly, capped at 0
 * Each MISMATCH in comparisonItems = 1 lie
 * Each MISSING in comparisonItems = 1 missingField
 */
export const DEMO_DATA: Record<string, ReportData> = {

    // --- VERIFIED: Bangalore, India ---
    // Score: 94 | Lies: 0 | Missing: 0
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
            { label: "Company Name", sourceValue: "Bangalore Garments Pvt Ltd", targetValue: "Bangalore Garments Pvt Ltd", status: "MATCH" },
            { label: "Total Workers", sourceValue: "1,200", targetValue: "1,200 (EPFO Verified)", status: "MATCH" },
            { label: "Minimum Wage", sourceValue: "₹18,000/month", targetValue: "₹14,500 min — ✅ Above", status: "MATCH" },
            { label: "Overtime Rate", sourceValue: "2x (Double pay)", targetValue: "2x (Legal Requirement)", status: "MATCH" },
            { label: "Provident Fund", sourceValue: "Fully Enrolled (100%)", targetValue: "Verified via EPFO portal", status: "MATCH" },
            { label: "Fire Safety NOC", sourceValue: "Valid till Dec 2027", targetValue: "Certificate Active", status: "MATCH" },
        ],
        summary: "**Bangalore Garments Pvt Ltd** has been fully verified against **EPFO**, **Ministry of Corporate Affairs**, and **Karnataka government** databases. All 1,200 employees are registered, wages exceed legal minimums, and all safety certifications are current. **Zero discrepancies found.**"
    },

    // --- SUSPICIOUS: Thai Nguyen, Vietnam ---
    // Score: 47 | Lies: 3 | Missing: 2
    "vietnam": {
        id: "VN-2026-8821",
        companyName: "Thai Nguyen Textiles Ltd.",
        location: "Thai Nguyen, Vietnam",
        flag: "🇻🇳",
        score: 47,
        verdict: "SUSPICIOUS",
        riskLevel: "High Risk",
        missingFields: 2,
        confidence: 98.5,
        lies: 3,
        comparisonItems: [
            { label: "Company Name", sourceValue: "Thai Nguyen Textiles", targetValue: "Thai Nguyen Textiles", status: "MATCH" },
            { label: "Total Workers", sourceValue: "500 employees", targetValue: "~200 EPFO contributors found", status: "MISMATCH" },
            { label: "Avg Wage", sourceValue: "8,500,000 VND (~$330)", targetValue: "ILO Benchmark: $420 (region)", status: "MISMATCH" },
            { label: "Overtime Hours", sourceValue: "0 hours/week", targetValue: "Satellite data: 24/7 shifts", status: "MISMATCH" },
            { label: "Subcontractors", sourceValue: "None declared", targetValue: "❌ MISSING (EU required)", status: "MISSING" },
            { label: "Union Status", sourceValue: "Not reported", targetValue: "❌ MISSING (ILO required)", status: "MISSING" },
        ],
        summary: "Verification of **Thai Nguyen Textiles** flagged **3 critical lies** and **2 missing mandatory fields**. EPFO-equivalent Vietnam data shows only ~200 active contributors vs. 500 claimed. Declared wages are **21% below ILO benchmarks** for the garment sector. Satellite imagery analysis detected **active night-shift lighting** contradicting zero overtime claims."
    },

    // --- SUSPICIOUS: Istanbul Fabrics, Turkey ---
    // Score: 52 | Lies: 2 | Missing: 3
    "turkey": {
        id: "TR-2026-3321",
        companyName: "Istanbul Fabrics A.Ş.",
        location: "Çorlu, Tekirdağ, Turkey",
        flag: "🇹🇷",
        score: 52,
        verdict: "SUSPICIOUS",
        riskLevel: "Medium-High Risk",
        missingFields: 3,
        confidence: 97.2,
        lies: 2,
        comparisonItems: [
            { label: "Company Name", sourceValue: "Istanbul Fabrics A.S.", targetValue: "Istanbul Fabrics A.Ş.", status: "MATCH" },
            { label: "Declared Workers", sourceValue: "420 insured", targetValue: "340 in SGK records (~19% gap)", status: "MISMATCH" },
            { label: "Avg Wage", sourceValue: "TRY 27,500/month", targetValue: "Bank avg: TRY 21,800 (~21% ↓)", status: "MISMATCH" },
            { label: "SGK Premiums", sourceValue: "Up to date", targetValue: "❌ MISSING — 3 months delayed", status: "MISSING" },
            { label: "Seasonal Workers", sourceValue: "Not declared", targetValue: "❌ MISSING — 80 undeclared", status: "MISSING" },
            { label: "Paid Leave", sourceValue: "Not declared", targetValue: "❌ MISSING — Partial only", status: "MISSING" },
        ],
        summary: "**Istanbul Fabrics A.Ş.** self-reported 420 insured workers, but **SGK (Turkish Social Security)** records show only **340 registered** — a 19% discrepancy. Declared average wages are **21% higher than verified bank transfer records**, suggesting systematic underreporting. SGK premium contributions are **3 months overdue**, indicating financial distress. **3 mandatory fields were entirely omitted** (seasonal workforce, pension compliance, leave records)."
    },

    // --- CRITICAL: Dhaka Knitwear, Bangladesh ---
    // Score: 22 | Lies: 5 | Missing: 4
    "bangladesh": {
        id: "BD-2026-1024",
        companyName: "Dhaka Knitwear Solutions Ltd.",
        location: "Ashulia EPZ, Dhaka, Bangladesh",
        flag: "🇧🇩",
        score: 22,
        verdict: "CRITICAL",
        riskLevel: "Critical Risk",
        missingFields: 4,
        confidence: 99.1,
        lies: 5,
        comparisonItems: [
            { label: "Worker Count", sourceValue: "3,200 declared", targetValue: "BGMEA: ~1,800 verified", status: "MISMATCH" },
            { label: "Under-18 Workers", sourceValue: "0 declared", targetValue: "14 minors detected (audit)", status: "MISMATCH" },
            { label: "Avg Wage", sourceValue: "BDT 9,500/month", targetValue: "Floor avg: BDT 7,200 (below min)", status: "MISMATCH" },
            { label: "Overtime Pay", sourceValue: "1.5x (declared)", targetValue: "Cash, unverified, no records", status: "MISMATCH" },
            { label: "Struct. Safety", sourceValue: "Not declared", targetValue: "❌ MISSING — Cert EXPIRED 2023", status: "MISSING" },
            { label: "Fire Exit Status", sourceValue: "Not declared", targetValue: "❌ MISSING — 2/6 exits blocked", status: "MISSING" },
            { label: "Child Labour Policy", sourceValue: "Not declared", targetValue: "❌ MISSING (BGMEA mandate)", status: "MISSING" },
            { label: "Subcontractor Chain", sourceValue: "Not declared", targetValue: "❌ MISSING (EU CSDDD req'd)", status: "MISSING" },
        ],
        summary: "**Dhaka Knitwear Solutions** presents **5 confirmed lies** and **4 missing mandatory fields**. Cross-referencing with **BGMEA** and **DIFE** records reveals: workforce is overstated by 78%, **14 child workers detected** in third-party audit, wages below Bangladesh's BDT 8,000 legal minimum, structural safety certificate **expired since 2023**, and 2 of 6 fire exits were found blocked. This factory is an **immediate supplier-drop risk**."
    },

    // --- CRITICAL: Shenzhen Apparel, China ---
    // Score: 9 | Lies: 6 | Missing: 5
    "china": {
        id: "CN-2026-1102",
        companyName: "Shenzhen Apparel Co. Ltd.",
        location: "Longhua District, Shenzhen, China",
        flag: "🇨🇳",
        score: 9,
        verdict: "CRITICAL",
        riskLevel: "Critical Risk",
        missingFields: 5,
        confidence: 99.8,
        lies: 6,
        comparisonItems: [
            { label: "Workforce Count", sourceValue: "2,100 declared", targetValue: "Insurance: 1,600 (24% gap)", status: "MISMATCH" },
            { label: "Avg Floor Wage", sourceValue: "CNY 5,800/month", targetValue: "Bank data: CNY 3,200 (-45%)", status: "MISMATCH" },
            { label: "Working Hours", sourceValue: "40 hours/week", targetValue: "Production logs: 72+ hrs/wk", status: "MISMATCH" },
            { label: "Xinjiang Workers", sourceValue: "280 (transfer program)", targetValue: "UFLPA Flagged — forced labour", status: "MISMATCH" },
            { label: "Overtime Pay", sourceValue: "Not declared", targetValue: "❌ MISSING — No records found", status: "MISSING" },
            { label: "Union Rights", sourceValue: "Not declared", targetValue: "❌ MISSING — ILO C87 required", status: "MISSING" },
            { label: "CBP WRO Status", sourceValue: "Not declared", targetValue: "❌ MISSING — Active WRO Alert", status: "MISSING" },
            { label: "Subcontractors", sourceValue: "Not declared", targetValue: "❌ MISSING — 3 tiers unknown", status: "MISSING" },
            { label: "Gender Pay Report", sourceValue: "Not declared", targetValue: "❌ MISSING (EU CSDDD req'd)", status: "MISSING" },
        ],
        summary: "**Shenzhen Apparel Co.** is flagged for **6 confirmed lies** and **5 omitted mandatory fields**. Wages are **45% below declared levels** per verified bank data. Production logs from ImportGenius show **72+ hour weeks** despite 40-hour declaration. **280 workers enrolled in the Xinjiang government transfer program** — a direct **U.S. Uyghur Forced Labor Prevention Act (UFLPA) and EU CSDDD violation**. An active **CBP Withhold Release Order (WRO)** is in effect. This supplier represents the **highest-risk score in the system**."
    },
};
