import React, { CSSProperties } from 'react';
import { User, LogOut, Bell } from 'lucide-react';
import moodMediaLogo from '../assets/moodmedia-logo.svg';

interface HeaderProps {
  user?: { email: string };
  onLogout?: () => void;
}

const styles: { [key: string]: CSSProperties } = {
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderBottom: '1px solid #e5e7eb',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '32px',
    width: 'auto',
    marginRight: '12px',
  },
  title: {
    marginLeft: '12px',
    fontSize: '14px',
    color: '#6b7280',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    padding: '8px',
    color: '#9ca3af',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'color 0.15s',
  },
  userSection: {
    position: 'relative',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    height: '20px',
    width: '20px',
    color: '#9ca3af',
  },
  userName: {
    fontSize: '14px',
    color: '#374151',
  },
};

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.leftSection}>
            <img 
              src={moodMediaLogo} 
              alt="MoodMedia" 
              style={styles.logo}
            />
            <span style={styles.title}>
              News Sentiment Dashboard
            </span>
          </div>
          
          <div style={styles.rightSection}>
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <div style={styles.userDetails}>
                  <User style={styles.icon} />
                  <span style={styles.userName}>
                    {user?.email || 'User'}
                  </span>
                </div>
                
                {onLogout && (
                  <button
                    onClick={onLogout}
                    style={styles.button}
                    title="Logout"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#6b7280';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9ca3af';
                    }}
                  >
                    <LogOut style={styles.icon} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};