import axios from 'axios';
import { NewsArticle, SentimentResult, DashboardData, UserPreferences } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const newsApi = {
  getArticles: async (startDate: string, endDate: string): Promise<NewsArticle[]> => {
    try {
      const response = await apiClient.get('/articles', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data.articles || [];
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Failed to fetch articles');
    }
  },

  getSentimentResults: async (articleIds: string[]): Promise<SentimentResult[]> => {
    try {
      const response = await apiClient.post('/sentiment/batch', {
        article_ids: articleIds,
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching sentiment results:', error);
      throw new Error('Failed to fetch sentiment results');
    }
  },

  getDashboardData: async (startDate: string, endDate: string): Promise<DashboardData> => {
    try {
      const [articles, sentiments] = await Promise.all([
        newsApi.getArticles(startDate, endDate),
        newsApi.getSentimentResults([]),
      ]);

      return {
        articles,
        sentimentResults: sentiments,
        totalCount: articles.length,
        dateRange: { start: startDate, end: endDate },
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  },
};

export const userApi = {
  savePreferences: async (preferences: UserPreferences): Promise<void> => {
    try {
      await apiClient.post('/preferences', preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw new Error('Failed to save preferences');
    }
  },

  getPreferences: async (): Promise<UserPreferences> => {
    try {
      const response = await apiClient.get('/preferences');
      return response.data;
    } catch (error) {
      console.error('Error fetching preferences:', error);
      throw new Error('Failed to fetch preferences');
    }
  },
};

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: any }> => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  },

  signup: async (email: string, password: string, name: string): Promise<{ token: string; user: any }> => {
    try {
      const response = await apiClient.post('/auth/signup', {
        email,
        password,
        name,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      
      return { token, user };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Failed to create account');
    }
  },

  logout: async (): Promise<void> => {
    try {
      localStorage.removeItem('authToken');
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getProfile: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile');
    }
  },
};