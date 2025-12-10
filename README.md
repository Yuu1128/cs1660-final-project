# News Dashboard

A React-based web application that displays news articles with sentiment analysis.

## AWS services Used

- Cognito for user authentication 
- Lambda for serverless backend functions
- API Gateway for routing requests
- DynamoDB for storing user preferences and article data
- EventBridge for scheduling daily news fetches
- SES for email notifications
- CloudWatch for logging and monitoring
- Amplify CLI for project setup and deployment

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

3. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

### AWS Amplify Hosting

This project is configured for deployment on AWS Amplify with automatic builds.
- Every push to the connected branch triggers automatic build and deployment
- Build configuration is defined in `amplify.yml`