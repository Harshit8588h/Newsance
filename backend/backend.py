import requests
import random
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

API_KEY = "778d1be08d854efaa984ad1ca0a24728"
BASE_URL = "https://newsapi.org/v2/top-headlines"
SEARCH_URL = "https://newsapi.org/v2/everything"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/discover")
def get_discover_news(country: str = "us"):
    categories = [
        "general",
        "world",
        "politics",
        "technology",
        "business",
        "sports",
        "entertainment",
        "health",
        "science"
    ]

    all_articles = []

    for cat in categories:
        url = f"{BASE_URL}?country={country}&category={cat}&pageSize=30&apiKey={API_KEY}"
        response = requests.get(url).json()

        if "articles" in response:
            for article in response["articles"]:
                all_articles.append({
                    "title": article.get("title"),
                    "description": article.get("description"),
                    "url": article.get("url"),
                    "image": article.get("urlToImage"),
                    "source": article["source"]["name"],
                    "category": cat
                })

    random.shuffle(all_articles)
    return {"articles": all_articles}


@app.get("/search")
def search_news(q: str = Query(..., description="Search term for news")):
    url = f"{SEARCH_URL}?q={q}&sortBy=publishedAt&pageSize=30&apiKey={API_KEY}"
    response = requests.get(url).json()

    articles = []
    if "articles" in response:
        for article in response["articles"]:
            articles.append({
                "title": article.get("title"),
                "description": article.get("description"),
                "url": article.get("url"),
                "image": article.get("urlToImage"),
                "source": article["source"]["name"]
            })

    return {"articles": articles}
