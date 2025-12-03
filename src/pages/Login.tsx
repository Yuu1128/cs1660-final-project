import React, { useState } from 'react';
import { AuthForm } from '../components/AuthForm';
import { authenticateUser } from '../services/mockData';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (email: string, password: string, name?: string) => {
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'login') {
        const result = await authenticateUser(email, password);
        if (result.success) {
          onLogin(result.user);
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // For signup, just simulate success for now
        setError('Signup functionality will be available soon');
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <AuthForm
      mode={mode}
      onSubmit={handleSubmit}
      onModeSwitch={handleModeSwitch}
      loading={loading}
      error={error}
    />
  );
};