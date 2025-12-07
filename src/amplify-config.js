export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID || '',
      loginWith: {
        email: true,
      }
    }
  },
  API: {
    REST: {
      NewsDashboardAPI: {
        endpoint: process.env.REACT_APP_API_URL || '',
        region: 'us-east-1'
      }
    }
  }
};