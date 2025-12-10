import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import { Dashboard } from './pages/Dashboard';
import { DashboardData, NewsArticle, UserPreferences } from './types';
import { useUserPreferences } from './hooks/useUserPreferences';

const styles: { [key: string]: CSSProperties } = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { preferences, hasPreferences, saveUserPreferences, loading: preferencesLoading } = useUserPreferences(user?.userId || null);

  // 1. CHECK AUTH STATUS ON LOAD
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const fullUser = { ...currentUser, ...attributes };
      setUser(fullUser);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

    useEffect(() => {
    if (isAuthenticated && hasPreferences && preferences) {
      fetchData(preferences.categories);
    }
  }, [isAuthenticated, hasPreferences, preferences]);

  // 2. FETCH DATA FROM AWS LAMBDA
  const fetchData = async (categories?: string[]) => {
    try {
      const restOperation = get({
        apiName: 'NewsDashboardAPI',
        path: '/articles',
        options: categories && categories.length > 0 ? {
          queryParams: {
            categories: categories.join(',')
          }
        } : undefined
      });
      const response = await restOperation.response;
      const json = await response.body.json() as any;

      const articles: NewsArticle[] = Array.isArray(json) ? json : [];

      const realData: DashboardData = {
        articles,
        sentimentResults: articles.map(a => ({
          articleId: a.articleId,
          sentimentScore: (a as any).sentimentScore || 0,
          sentiment: (a as any).sentimentScore > 0.05 ? 'positive' as const :
                     (a as any).sentimentScore < -0.05 ? 'negative' as const :
                     'neutral' as const
        })),
        totalCount: articles.length,
        dateRange: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        },
        stats: {
           totalArticles: articles.length,
           positiveCount: articles.filter((a: any) => a.sentimentScore > 0.05).length,
           negativeCount: articles.filter((a: any) => a.sentimentScore < -0.05).length,
           neutralCount: articles.filter((a: any) => a.sentimentScore >= -0.05 && a.sentimentScore <= 0.05).length,
        },
        lastUpdated: new Date().toISOString()
      };

      setDashboardData(realData);
    } catch (e) {
      console.error('Failed to fetch news:', e);
    }
  };

  const updateDashboardData = useCallback((data: DashboardData) => {
    setDashboardData(data);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut();
    setUser(null);
    setIsAuthenticated(false);
    setDashboardData(null);
  }, []);

  const handlePreferencesSave = useCallback(async (newPreferences: UserPreferences): Promise<boolean> => {
    const success = await saveUserPreferences(newPreferences);
    if (success) {
      await fetchData(newPreferences.categories);
    }
    return success || false;
  }, [saveUserPreferences]);

  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                (
                  <div style={styles.loginContainer}>
                    <Authenticator>
                      {({ user }) => {
                        if (user && !isAuthenticated) checkUser();
                        return <div>Loading Dashboard...</div>;
                      }}
                    </Authenticator>
                  </div>
                )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard 
                  dashboardData={dashboardData} 
                  setDashboardData={updateDashboardData} 
                  user={user} 
                  onLogout={handleLogout}
                  hasPreferences={hasPreferences}
                  saveUserPreferences={handlePreferencesSave}
                  preferencesLoading={preferencesLoading}
                /> : 
                <Navigate to="/login" replace />
            } 
          />
    
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;