# Veritas Bridge 🌉
### *Making Honesty Cheaper Than Lies*

Veritas Bridge is a next-generation supply chain verification platform built for the Hult Prize. It uses **real-time public data scraping** and **AI analysis** to verify factory claims without requiring expensive physical audits.

---

## 🚀 Core Features

### 1. **Format Translation Hub (The "Bridge")**
   - **Universal Translator**: Instantly converts local factory reports (e.g., Vietnam MOLISA) into international compliance formats (EU CSDDD, US Uyghur Act).
   - **Gap Analysis**: Automatically detects missing fields required for compliance.
   - **Side-by-Side Comparison**: Visual diff tool to see exactly what changed during translation.

### 2. **Veritas Score & Lie Detection**
   - **Truth Score (0-100)**: A dynamic trust score calculated from cross-referencing claims against 6+ valid data sources.
   - **Lie Detector**: flags specific discrepancies with **High Confidence Proof**.
     - *Example*: Factory claims 500 workers, but **EPFO India Database** shows only 200 active contributors.
     - *Example*: Factory claims $400 wage, but **ILO Benchmarks** + **Bank Data** show $250 avg.

### 3. **Brand Supplier Portal**
   - **Risk Dashboard**: Brands can see their entire supply chain at a glance.
   - **Real-Time Alerts**: "Red Flag" notifications when a supplier's risk score spikes (e.g., negative news, legal strikes).
   - **Visual Verification**: Premium cards showing Verified/Suspicious status.

### 4. **Real-Time Data Scrapers (Python Engine)**
   - **EPFO Scraper**: Checks active worker counts from Indian Govt Provident Fund portal.
   - **ILO API**: Fetches latest minimum wage and sector-specific earning benchmarks.
   - **MCA Master Data**: Verifies company registration, directors, and capital.
   - **ImportGenius**: Analyzes export volume to detect underreporting (tax fraud risk).
   - **Google News**: Sentiment analysis to catch strikes, fires, or labor violations.
   - **Satellite Analysis**: Uses Google Earth Engine to estimate factory capacity from roof size.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS (v4), Lucide React, Framer Motion
- **Design System**: Custom "Veritas" Theme (Slate/Emerald/Amber/Red)
- **Backend/Scrapers**: Python 3.10+, Selenium, Pandas, Google Earth Engine API, TextBlob (Sentiment)

---

## 💻 How to Run

### 1. Start the Web Application (Frontend)
This runs the Dashboard, Brand Portal, and Landing Page.
```bash
npm run dev
```
> Open **http://localhost:3000** in your browser.

### 2. Run the Verification Engine (Backend Scrapers)
This executes the Python scripts to fetch real data and generate the Veritas Score.
```bash
# Install dependencies first
pip install -r src/scripts/requirements.txt

# Run the full verification pipeline
python src/scripts/run_verification.py
```

### 3. Demo Flow for Judges
1.  **Landing Page**: Show the "Start Verification" CTA.
2.  **Upload**: Drag & drop a dummy report at `/upload`.
3.  **Processing**: Watch the 5-step verification animation.
4.  **Dashboard**: Show the **47/100 Score**, the **Lie Cards** (expand them to show proofs), and the **Comparison View**.
5.  **Brand Portal**: Switch to `/brand` to show how a major brand (like H&M) would view their supplier list.

---

## 📂 Project Structure
- `src/app`: Next.js Pages (Home, Dashboard, Brand, Upload)
- `src/components`: Reusable UI (Hero, Cards, LieDetector, Graphs)
- `src/scripts`: Python Scrapers (`epfo_scraper.py`, `run_verification.py`, etc.)
- `src/lib`: Utilities

---

*Built with ❤️ for the Hult Prize 2026*
