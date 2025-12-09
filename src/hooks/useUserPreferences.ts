import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';

interface UserPreferences {
  categories: string[];
}

export const useUserPreferences = (userId: string | null) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPreferences = async () => {
      try {
        const restOperation = get({
          apiName: 'NewsDashboardAPI',
          path: `/user-preferences/${userId}`
        });
        
        const response = await restOperation.response;
        const data = await response.body.json() as any;
        
        if (data && data.preferences) {
          setPreferences(data.preferences);
        }
      } catch (error: any) {
        if (error?.response?.status !== 404) {
          console.error('Failed to fetch user preferences:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  return { preferences, setPreferences, loading };
};