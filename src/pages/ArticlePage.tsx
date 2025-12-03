import React, { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface ArticlePageProps {
  articles: Array<{
    articleId: string;
    title: string;
    url: string;
    content: string;
    publishedAt: string;
    source: string;
    topic: string;
  }>;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const article = articles.find(a => a.articleId === id);
  
  if (!article) {
    return (
      <div style={containerStyle}>
        <div style={notFoundStyle}>
          <h2 style={notFoundTitleStyle}>Article Not Found</h2>
          <p style={notFoundTextStyle}>The article you're looking for could not be found.</p>
          <button 
            onClick={() => navigate('/dashboard')} 
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <ArrowLeft size={16} style={iconStyle} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} style={paragraphStyle}>
        {paragraph.trim()}
      </p>
    ));
  };
  
  return (
    <div style={containerStyle}>
      <div style={articleContainerStyle}>
        <button 
          onClick={handleBack} 
          style={backButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          <ArrowLeft size={16} style={iconStyle} />
          Back to Dashboard
        </button>
        
        <article style={articleStyle}>
          <div style={topicBadgeStyle}>{article.topic}</div>
          
          <h1 style={titleStyle}>{article.title}</h1>
          
          <div style={metaStyle}>
            <div style={metaItemStyle}>
              <Calendar size={16} style={metaIconStyle} />
              <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy • h:mm a')}</span>
            </div>
            
            <div style={metaItemStyle}>
              <ExternalLink size={16} style={metaIconStyle} />
              <span>{article.source}</span>
            </div>
          </div>
          
          <div style={contentStyle}>
            {formatContent(article.content)}
          </div>
        </article>
      </div>
    </div>
  );
};

const containerStyle: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
  paddingTop: '24px',
  paddingBottom: '48px',
};

const articleContainerStyle: CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 24px',
};

const backButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  color: '#374151',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  marginBottom: '24px',
  textDecoration: 'none',
  transition: 'all 0.2s',
};

const iconStyle: CSSProperties = {
  marginRight: '8px',
};

const articleStyle: CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const topicBadgeStyle: CSSProperties = {
  display: 'inline-block',
  padding: '4px 12px',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const titleStyle: CSSProperties = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#111827',
  lineHeight: '1.2',
  marginBottom: '24px',
  margin: '0 0 24px 0',
};

const metaStyle: CSSProperties = {
  display: 'flex',
  gap: '24px',
  marginBottom: '32px',
  paddingBottom: '24px',
  borderBottom: '1px solid #e5e7eb',
  flexWrap: 'wrap',
};

const metaItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: '#6b7280',
  fontSize: '14px',
};

const metaIconStyle: CSSProperties = {
  marginRight: '8px',
};

const contentStyle: CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#374151',
};

const paragraphStyle: CSSProperties = {
  marginBottom: '20px',
  margin: '0 0 20px 0',
};

const notFoundStyle: CSSProperties = {
  textAlign: 'center',
  padding: '64px 24px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  margin: '0 auto',
};

const notFoundTitleStyle: CSSProperties = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#111827',
  marginBottom: '16px',
  margin: '0 0 16px 0',
};

const notFoundTextStyle: CSSProperties = {
  color: '#6b7280',
  marginBottom: '24px',
  margin: '0 0 24px 0',
};