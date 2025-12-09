import { get, post } from 'aws-amplify/api';

export interface UserPreferencesData {
  userId: string;
  preferences: {
    categories: string[];
  };
}

export const userPreferencesApi = {
  savePreferences: async (userId: string, categories: string[]) => {
    try {
      const restOperation = post({
        apiName: 'NewsDashboardAPI',
        path: '/user-preferences',
        options: {
          body: {
            userId,
            preferences: {
              categories
            }
          }
        }
      });
      
      const response = await restOperation.response;
      return await response.body.json();
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  },

  getPreferences: async (userId: string): Promise<UserPreferencesData | null> => {
    try {
      const restOperation = get({
        apiName: 'NewsDashboardAPI',
        path: `/user-preferences/${userId}`
      });
      
      const response = await restOperation.response;
      const data = await response.body.json() as any;
      return data as UserPreferencesData;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }
};