import React, { useState, CSSProperties } from 'react';
import { Header } from '../components/Header';
import { DateFilter } from '../components/DateFilter';
import { ArticleCard } from '../components/ArticleCard';
import { UserPreferencesForm } from '../components/UserPreferencesForm';
import { DashboardData, UserPreferences } from '../types';
import { format, subDays } from 'date-fns';

interface DashboardProps {
  dashboardData: DashboardData | null;
  setDashboardData: (data: DashboardData) => void;
  user?: any;
  onLogout?: () => void;
  hasPreferences: boolean;
  saveUserPreferences: (preferences: UserPreferences) => Promise<boolean>;
  preferencesLoading: boolean;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  content: {
    padding: '24px 0',
  },
  dateFilterSection: {
    marginBottom: '24px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '256px',
  },
  spinner: {
    height: '128px',
    width: '128px',
    borderRadius: '50%',
    border: '2px solid transparent',
    borderBottom: '2px solid #4f46e5',
    animation: 'spin 1s linear infinite',
  },
  articlesCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb',
    padding: '24px',
  },
  articlesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  articlesTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
  },
  articlesGrid: {
    display: 'grid',
    gap: '24px',
  },
};

export const Dashboard: React.FC<DashboardProps> = ({ dashboardData, setDashboardData, user, onLogout, hasPreferences, saveUserPreferences, preferencesLoading }) => {
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleQuickFilter = (days: number) => {
    const end = new Date();
    const start = subDays(end, days - 1);
    setStartDate(format(start, 'yyyy-MM-dd'));
    setEndDate(format(end, 'yyyy-MM-dd'));
  };

  const filteredArticles = dashboardData?.articles.filter(article => {
    if (!article.pubDate) return false;
    
    const articleDate = new Date(article.pubDate);

    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T23:59:59.999');
    
    const articleLocalDate = new Date(
      articleDate.getFullYear(),
      articleDate.getMonth(),
      articleDate.getDate(),
      articleDate.getHours(),
      articleDate.getMinutes(),
      articleDate.getSeconds(),
      articleDate.getMilliseconds()
    );
    
    return articleLocalDate >= start && articleLocalDate <= end;
  }) || [];

  const filteredSentiments = dashboardData?.sentimentResults.filter(sentiment => 
    filteredArticles.some(article => article.articleId === sentiment.articleId)
  ) || [];




  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.container}>
        <Header user={user} onLogout={onLogout} />
        
        <main style={styles.main}>
          {!hasPreferences && !preferencesLoading && (
            <UserPreferencesForm onSave={saveUserPreferences} loading={preferencesLoading} />
          )}
          <div style={styles.content}>
            <div style={styles.dateFilterSection}>
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onQuickFilter={handleQuickFilter}
              />
            </div>

            {!dashboardData ? (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
              </div>
            ) : (
              <div style={styles.articlesCard}>
                <div style={styles.articlesHeader}>
                  <h2 style={styles.articlesTitle}>
                    Recent Articles
                  </h2>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {filteredArticles.length} articles found
                  </span>
                </div>

                <div style={styles.articlesGrid}>
                  {filteredArticles.map(article => {
                    const sentiment = filteredSentiments.find(
                      s => s.articleId === article.articleId
                    );
                    return (
                      <ArticleCard
                        key={article.articleId}
                        article={article}
                        sentiment={sentiment}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};