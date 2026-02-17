import asyncio
import json
import epfo_scraper
import ilo_api
import mca_scraper
import import_genius
import news_scraper
import satellite_check
from datetime import datetime

async def verify_factory(factory_name, tax_id, country_code, lat, lon):
    """
    Main Orchestrator: Runs all 6 verification modules in parallel.
    """
    print(f"\n{'='*60}")
    print(f"🚀 STARTING VERITAS BRIDGE VERIFICATION: {factory_name}")
    print(f"{'='*60}\n")
    
    start_time = datetime.now()
    
    # Define tasks
    # Note: Some scripts are synchronous, so we wrap them or run them directly.
    # In a full async implementation, all scrapers would be async.
    # Here we simulate parallel execution logic.
    
    results = {
        "metadata": {
            "factory": factory_name,
            "id": tax_id,
            "verification_date": start_time.strftime("%Y-%m-%d %H:%M:%S")
        },
        "modules": {}
    }

    print(">>> 1. WORKER VERIFICATION (EPFO + Satellite)")
    epfo_data = epfo_scraper.check_epfo(tax_id, factory_name)
    sat_data = satellite_check.check_factory_size(factory_name, lat, lon)
    
    print("\n>>> 2. FINANCIAL & LEGAL (MCA + ImportGenius)")
    mca_data = mca_scraper.check_mca(factory_name)
    export_data = import_genius.check_export_data(factory_name)
    
    print("\n>>> 3. SOCIAL & COMPLIANCE (ILO + News)")
    ilo_data = ilo_api.get_wage_benchmark(country_code)
    news_data = news_scraper.check_negative_news(factory_name)
    
    # Aggregate Rules
    results["modules"]["epfo"] = epfo_data
    results["modules"]["satellite"] = sat_data
    results["modules"]["mca"] = mca_data
    results["modules"]["exports"] = export_data
    results["modules"]["ilo"] = ilo_data
    results["modules"]["news"] = news_data
    
    # Calculate Veritas Score (Simplified Logic)
    score = 100
    flags = []
    
    # 1. Worker Count Check
    claimed_workers = 500 # From user report
    real_workers = epfo_data.get("active_contributors", 0)
    if real_workers < claimed_workers * 0.5:
        score -= 20
        flags.append("CRITICAL: Ghost Workers Detected (EPFO)")
        
    # 2. Wage Check
    claimed_wage = 400
    avg_wage = ilo_data.get("avg_monthly_wage_usd", 300)
    if claimed_wage > avg_wage * 1.3: # Claiming way above average is suspicious
        score -= 10
        flags.append("SUSPICIOUS: Inflated Wage Claims")
        
    # 3. Export Check
    claimed_exports = 2000000
    real_exports = export_data.get("data", {}).get("total_value_usd", 0)
    if real_exports > claimed_exports * 2:
        score -= 15
        flags.append("CRITICAL: Massive Export Underreporting (Tax Fraud Risk)")
        
    # 4. News Check
    if news_data.get("negative_mentions", 0) > 0:
        score -= 15
        flags.append("WARNING: Negative News/PR Risk")
        
    results["veritas_score"] = score
    results["verdict"] = "VERIFIED" if score > 80 else "SUSPICIOUS" if score > 50 else "CRITICAL"
    results["flags"] = flags
    
    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()
    
    print(f"\n{'='*60}")
    print(f"🏁 VERIFICATION COMPLETE in {duration:.2f}s")
    print(f"🏆 VERITAS SCORE: {score}/100 ({results['verdict']})")
    print(f"{'='*60}\n")
    
    return results

if __name__ == "__main__":
    # Run the full pipeline
    full_report = asyncio.run(verify_factory(
        factory_name="Thai Nguyen Textiles",
        tax_id="VN/123456",
        country_code="VNM",
        lat=21.5942,
        lon=105.8481
    ))
    
    # Save Final JSON Report
    with open("veritas_final_report.json", "w") as f:
        json.dump(full_report, f, indent=2)
    
    print("📄 Report saved to veritas_final_report.json")
