import React, { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsArticle, SentimentResult } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  sentiment?: SentimentResult;
}

const styles: { [key: string]: CSSProperties } = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '2px solid',
    padding: '24px',
    transition: 'box-shadow 0.15s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px',
  },
  timeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  icon: {
    height: '16px',
    width: '16px',
  },
  separator: {
    fontSize: '14px',
  },
  topicTag: {
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '50px',
    fontSize: '12px',
  },
  description: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  readButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#4f46e5',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'color 0.15s',
  },
  buttonIcon: {
    height: '16px',
    width: '16px',
  },
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, sentiment }) => {
  const getSentimentBorderColor = (score?: number) => {
    if (!score) return '#e5e7eb';
    if (score > 0.1) return '#86efac';
    if (score < -0.1) return '#fca5a5';
    return '#fcd34d';
  };

  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const cardStyle: CSSProperties = {
    ...styles.card,
    borderColor: getSentimentBorderColor(sentiment?.sentimentScore),
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      }}
    >
      <div style={styles.header}>
        <div style={styles.content}>
          <h3 style={styles.title}>
            {article.title}
          </h3>

          <div style={styles.meta}>
            <div style={styles.timeInfo}>
              <span>{article.pubDate}</span>
            </div>
            <span style={styles.separator}>•</span>
            <span style={styles.topicTag}>
              {article.topic}
            </span>
          </div>
        </div>
      </div>

      {article.description && (
        <p style={styles.description}>
          {article.description}
        </p>
      )}

      <div style={styles.footer}>
        <button
          onClick={handleReadMore}
          style={styles.readButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4338ca';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4f46e5';
          }}
        >
          <span>Read article</span>
          <ArrowRight style={styles.buttonIcon} />
        </button>
      </div>
    </div>
  );
};