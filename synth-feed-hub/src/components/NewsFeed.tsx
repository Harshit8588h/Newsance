import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  category: string;
}

export default function Discover() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchNews = async (term?: string) => {
    setLoading(true);
    try {
      const endpoint = term && term.trim() !== ""
        ? `http://127.0.0.1:5000/search?q=${encodeURIComponent(term)}`
        : `http://127.0.0.1:5000/discover`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(); // load trending on mount
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Discover News</h2>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center mt-6">Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-2 block"
                >
                  Read More →
                </a>
                <p className="text-xs text-gray-400 mt-1">
                  {article.source} | {article.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
