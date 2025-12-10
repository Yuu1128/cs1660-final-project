export interface NewsArticle {
  articleId: string;
  title: string;
  url: string;
  description: string;
  pubDate?: string;
  topic: string;
  timestamp?: number;
  sentimentScore?: number;
}

export interface SentimentResult {
  articleId: string;
  sentimentScore: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface User {
  userId: string;
  email: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  topics: string[];
  sources: string[];
  sentimentThreshold?: number;
}

export interface DashboardData {
  articles: NewsArticle[];
  sentimentResults: SentimentResult[];
  totalCount: number;
  dateRange: {
    start: string;
    end: string;
  };
  stats?: {
    totalArticles: number;
    positiveCount: number;
    negativeCount: number;
    neutralCount: number;
  };
  lastUpdated?: string;
}