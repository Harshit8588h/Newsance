import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("http://127.0.0.1:5000/news?query=AI");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    }
    fetchNews();
  }, []);

  return (
    <div>
      {articles.map((article, i) => (
        <div key={i} className="p-4 border-b">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" className="text-blue-600">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
