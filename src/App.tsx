import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ArticlePage } from './pages/ArticlePage';
import { generateMockDashboardData } from './services/mockData';
import { DashboardData } from './types';
import { format, subDays } from 'date-fns';

const styles: { [key: string]: CSSProperties } = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const updateDashboardData = useCallback((data: DashboardData) => {
    setDashboardData(data);
  }, []);

  const handleLogin = useCallback((userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');
    const data = generateMockDashboardData(startDate, endDate);
    setDashboardData(data);
  }, []);

  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard dashboardData={dashboardData} setDashboardData={updateDashboardData} user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/article/:id" 
            element={
              isAuthenticated ? 
                <ArticlePage articles={dashboardData?.articles || []} /> : 
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
