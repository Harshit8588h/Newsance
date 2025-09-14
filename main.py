# import requests

# url = "https://newsapi.org/v2/everything"
# params = {
#     "q":"Artificial Intelligence",
#     "apikey": "778d1be08d854efaa984ad1ca0a24728"
# }
# responce = requests.get(url, params=params)

# data = responce.json()
# for article in data["articles"][:5]:
#     print("Headlines\n", article["title"])
#     print("Link", article["url"])
#     print("-"*50)
from fastapi import APIRouter
import requests
import os

router = APIRouter()

NEWS_API_KEY = os.getenv("778d1be08d854efaa984ad1ca0a24728")

@router.get("/trending")
def get_trending_news():
    url = f"https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return data

