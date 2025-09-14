import { ExternalLink, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NewsItem {
  id: string;
  headline: string;
  snippet: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  domain: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-news-card-hover hover:bg-card-hover animate-fade-in">
      <CardContent className="p-0">
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          {/* Image */}
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={news.imageUrl}
              alt={news.headline}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Source and Time */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="font-medium text-primary">{news.source}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(news.publishedAt)}</span>
              </div>
            </div>

            {/* Headline */}
            <h3 className="font-semibold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {news.headline}
            </h3>

            {/* Snippet */}
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {news.snippet}
            </p>

            {/* Read More */}
            <div className="flex items-center space-x-1 text-primary text-sm font-medium pt-2">
              <span>Read more</span>
              <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;