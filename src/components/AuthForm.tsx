import React, { useState, CSSProperties } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import moodMediaLogo from '../assets/moodmedia-logo.svg';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (email: string, password: string, name?: string) => void;
  onModeSwitch: () => void;
  loading?: boolean;
  error?: string;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: '48px 16px',
  },
  formWrapper: {
    maxWidth: '448px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  logo: {
    height: '80px',
    width: 'auto',
  },
  title: {
    marginTop: '8px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
  },
  subtitle: {
    marginTop: '8px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputWrapper: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '7px',
    height: '20px',
    width: '20px',
    color: '#9ca3af',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px 40px 8px 40px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  inputWithRightIcon: {
    display: 'block',
    width: '100%',
    padding: '8px 40px 8px 40px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  toggleButton: {
    position: 'absolute',
    right: '16px',
    top: '5px',
    height: '20px',
    width: '20px',
    color: '#9ca3af',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.15s',
  },
  errorContainer: {
    borderRadius: '6px',
    backgroundColor: '#fef2f2',
    padding: '16px',
  },
  errorText: {
    fontSize: '14px',
    color: '#dc2626',
  },
  submitButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    color: 'white',
    backgroundColor: '#4f46e5',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.15s',
  },
  submitButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  switchContainer: {
    textAlign: 'center',
  },
  switchButton: {
    color: '#4f46e5',
    fontSize: '14px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.15s',
  },
};

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onModeSwitch,
  loading = false,
  error
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, mode === 'signup' ? name : undefined);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div>
          <div style={styles.logoContainer}>
            <img 
              src={moodMediaLogo} 
              alt="MoodMedia Logo" 
              style={styles.logo}
            />
          </div>
          <h2 style={styles.title}>
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p style={styles.subtitle}>
            News Sentiment Dashboard
          </p>
        </div>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" style={styles.label}>
                  Full name
                </label>
                <div style={styles.inputWrapper}>
                  <User style={styles.icon} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    placeholder="Full name"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4f46e5';
                      e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" style={styles.label}>
                Email address
              </label>
              <div style={styles.inputWrapper}>
                <Mail style={styles.icon} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="Email address"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4f46e5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputWrapper}>
                <Lock style={styles.icon} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.inputWithRightIcon}
                  placeholder="Password"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4f46e5';
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorText}>{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#4338ca';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#4f46e5';
                }
              }}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div style={styles.switchContainer}>
            <button
              type="button"
              onClick={onModeSwitch}
              style={styles.switchButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4338ca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4f46e5';
              }}
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};