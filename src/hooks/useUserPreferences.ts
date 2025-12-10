import { useState, useEffect } from 'react';
import { get, post } from 'aws-amplify/api';
import { UserPreferences } from '../types';

export const useUserPreferences = (userId: string | null) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserPreferences();
    }
  }, [userId]);

  const fetchUserPreferences = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const restOperation = get({
        apiName: 'NewsDashboardAPI',
        path: `/user-preferences/${userId}`,
      });
      const response = await restOperation.response;
      const data = await response.body.json() as any;
      
      if (data && data.preferences && data.preferences.categories && data.preferences.categories.length > 0) {
        setPreferences(data.preferences);
        setHasPreferences(true);
      } else {
        setPreferences(null);
        setHasPreferences(false);
      }
    } catch (error) {
      console.error('Failed to fetch user preferences:', error);
      setHasPreferences(false);
    } finally {
      setLoading(false);
    }
  };

  const saveUserPreferences = async (newPreferences: UserPreferences) => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const restOperation = post({
        apiName: 'NewsDashboardAPI',
        path: '/user-preferences',
        options: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            userId,
            preferences: newPreferences
          }
        }
      });
      const response = await restOperation.response;
      const data = await response.body.json() as any;
      
      if (data.data) {
        setPreferences(newPreferences);
        setHasPreferences(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    preferences,
    loading,
    hasPreferences,
    saveUserPreferences,
    fetchUserPreferences
  };
};