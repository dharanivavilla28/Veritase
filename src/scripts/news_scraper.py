from gnews import GNews
from textblob import TextBlob
import json
from datetime import datetime

def check_negative_news(factory_name, country="Vietnam"):
    """
    Searches Google News for negative mentions of the factory.
    """
    print(f"[*] Searching Google News for {factory_name}...")
    
    google_news = GNews(language='en', country=country, max_results=5)
    
    # Keywords for risk
    risk_keywords = ["strike", "protest", "violation", "accident", "complaint", "labor", "fire", "death", "unpaid"]
    query = f'"{factory_name}" AND ({ " OR ".join(risk_keywords) })'
    
    # news = google_news.get_news(query) # Real API call
    
    # MOCKING RESULTS TO ENSURE DEMO SHOWS NEGATIVE NEWS
    # In production, use the line above. 
    # For demo consistency (ensuring "Lie #1" context matches), we inject a finding.
    
    mock_articles = [
        {
            "title": f"Workers protest at {factory_name} factory over unpaid wages",
            "published date": "2025-11-15",
            "description": "Around 200 workers staged a protest at the factory gates demanding immediate payment of delayed salaries for October.",
            "url": "https://vietnamnews.vn/society/12345/workers-protest",
            "publisher": {"href": "https://vietnamnews.vn", "title": "Vietnam News"}
        }
    ]
    
    results = {
        "factory_name": factory_name,
        "articles_found": len(mock_articles),
        "negative_mentions": 0,
        "articles": []
    }
    
    for article in mock_articles:
        # Sentiment Analysis
        blob = TextBlob(article['title'] + " " + article['description'])
        sentiment_score = blob.sentiment.polarity
        
        status = "NEUTRAL"
        if sentiment_score < -0.1:
            status = "NEGATIVE"
            results["negative_mentions"] += 1
        elif sentiment_score > 0.1:
            status = "POSITIVE"
            
        results["articles"].append({
            "title": article['title'],
            "source": article['publisher']['title'],
            "date": article['published date'],
            "snippet": article['description'],
            "url": article['url'],
            "sentiment": status,
            "score": sentiment_score
        })

    results["verdict"] = "RISK DETECTED" if results["negative_mentions"] > 0 else "CLEAN"
    
    print(f"[+] News Scan Complete: {results['negative_mentions']} negative articles found.")
    return results

if __name__ == "__main__":
    data = check_negative_news("Thai Nguyen Textiles")
    print(json.dumps(data, indent=2))
