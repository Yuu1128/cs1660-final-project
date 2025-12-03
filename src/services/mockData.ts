import { NewsArticle, SentimentResult, DashboardData } from '../types';
import { format, subDays } from 'date-fns';

export const generateMockArticles = (count: number = 10): NewsArticle[] => {
  const topics = ['Economy', 'Technology', 'Politics', 'Business', 'Healthcare', 'Environment'];
  const sources = ['Reuters', 'Bloomberg', 'CNN Business', 'Financial Times', 'The Wall Street Journal', 'Associated Press'];
  
  const sampleTitles = [
    'Stock Market Shows Strong Recovery Amid Economic Uncertainty',
    'Tech Giants Report Record Quarterly Earnings',
    'New Climate Policy Could Reshape Energy Sector',
    'Federal Reserve Announces Interest Rate Decision',
    'Innovation in Artificial Intelligence Drives Market Growth',
    'Global Supply Chain Disruptions Continue to Impact Businesses',
    'Renewable Energy Investment Reaches All-Time High',
    'Economic Data Suggests Inflation May Be Cooling',
    'Cryptocurrency Market Experiences Significant Volatility',
    'Labor Market Shows Signs of Strengthening'
  ];

  const sampleContent = [
    `The stock market demonstrated remarkable resilience today as major indices posted significant gains despite ongoing economic uncertainty. The S&P 500 climbed 2.3% while the Nasdaq gained 2.8%, marking the strongest single-day performance in weeks.

Investors responded positively to better-than-expected quarterly earnings from several major corporations and encouraging economic data that suggests the economy may be more robust than previously anticipated. Consumer spending patterns have shown surprising strength, particularly in the technology and healthcare sectors.

Market analysts note that while volatility remains elevated, the underlying fundamentals appear to be stabilizing. "We're seeing a shift in investor sentiment," said Sarah Chen, chief market strategist at Global Investment Partners. "The combination of strong corporate earnings and improving economic indicators is providing a foundation for sustained growth."

The Federal Reserve's recent statements regarding monetary policy have also contributed to the positive market sentiment. Officials have indicated a more measured approach to interest rate adjustments, which has helped calm investor concerns about aggressive tightening measures.

Looking ahead, economists remain cautiously optimistic about the market's trajectory, though they emphasize the importance of continued monitoring of inflation trends and global economic developments.`,

    `Technology giants delivered exceptional quarterly results that exceeded Wall Street expectations across nearly every metric. Combined revenue for the top five tech companies reached a record $400 billion, representing a 15% increase year-over-year.

Apple led the charge with iPhone sales surpassing projections despite supply chain concerns. The company reported revenue of $94.8 billion, driven by strong demand in international markets and robust services growth. CEO Tim Cook attributed the success to innovative product features and expanding ecosystem integration.

Microsoft continued its cloud dominance with Azure revenue growing 35% compared to the previous quarter. The company's enterprise solutions have gained significant traction as businesses accelerate digital transformation initiatives. LinkedIn and Office 365 subscriptions also contributed substantially to the strong performance.

Amazon's AWS division maintained its market leadership position, though growth rates have moderated slightly as the cloud market matures. The e-commerce giant's advertising revenue grew 25%, reflecting increased competition in the digital advertising space.

Google parent Alphabet reported search revenue growth of 8%, while YouTube advertising revenue increased 12%. The company's investments in artificial intelligence and machine learning capabilities are beginning to show tangible returns through improved ad targeting and content recommendations.

Meta Platforms showed signs of recovery with user engagement metrics improving across all platforms. The company's metaverse investments, while still costly, are beginning to show promising developments in virtual reality adoption.`,

    `A comprehensive new climate policy framework could fundamentally reshape the energy sector landscape over the next decade. The proposed legislation includes ambitious targets for renewable energy adoption, carbon emission reductions, and substantial incentives for clean technology development.

The policy establishes a national clean energy standard requiring utilities to source 80% of electricity from renewable sources by 2035. This represents a significant acceleration from current renewable energy adoption rates and will require massive infrastructure investments estimated at $2.5 trillion.

Solar and wind energy companies have already begun announcing expansion plans in anticipation of the policy implementation. Industry leaders expect job creation in the hundreds of thousands as manufacturing, installation, and maintenance operations scale up to meet new demand.

Traditional fossil fuel companies are also adapting their strategies, with several major oil and gas corporations announcing increased investments in renewable energy projects and carbon capture technologies. The policy includes transition assistance for communities historically dependent on fossil fuel industries.

Environmental groups have largely praised the initiative while noting that implementation timelines remain aggressive. "This represents the most significant climate action in a generation," said Dr. Michael Rodriguez, director of the Climate Action Institute. "Success will depend on coordinated efforts between federal, state, and local governments."

Economic modeling suggests the policy could create substantial long-term savings for consumers while positioning the country as a global leader in clean energy technology exports.`,

    `The Federal Reserve announced its latest interest rate decision following a two-day policy meeting, opting to maintain the current federal funds rate at 5.25-5.50%. The decision reflects the central bank's cautious approach to monetary policy amid mixed economic signals and persistent inflation concerns.

Fed Chairman Jerome Powell emphasized the committee's commitment to data-driven decision-making during the post-meeting press conference. "We remain vigilant in our efforts to restore price stability while supporting maximum employment," Powell stated. "Current economic conditions warrant a measured approach to policy adjustments."

Recent economic data has presented a complex picture, with unemployment remaining near historic lows while inflation, though declining, continues above the Fed's 2% target. Consumer price index data showed a 3.2% annual increase, down from previous months but still elevated compared to the central bank's preferred range.

Labor market strength has been a key factor in the Fed's decision-making process. Job creation has exceeded expectations for three consecutive months, with particular strength in professional services, healthcare, and technology sectors. However, wage growth has begun to moderate, potentially easing inflationary pressures.

Financial markets responded positively to the announcement, with bond yields declining and equity markets posting gains. Investors interpreted the decision as evidence that the Fed may be nearing the end of its tightening cycle.

The central bank's updated economic projections suggest potential rate cuts may be considered in the latter half of the year, contingent on continued progress in bringing inflation down to target levels.`
  ];

  return Array.from({ length: count }, (_, i) => ({
    articleId: `mock-article-${i + 1}`,
    title: sampleTitles[i % sampleTitles.length] + ` - Report ${i + 1}`,
    url: `https://example.com/article-${i + 1}`,
    content: sampleContent[i % sampleContent.length],
    publishedAt: format(
      subDays(new Date(), i % 7), 
      'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''
    ),
    source: sources[i % sources.length],
    topic: topics[i % topics.length],
    imageUrl: `https://picsum.photos/400/200?random=${i}`,
  }));
};

export const generateMockSentimentResults = (articles: NewsArticle[]): SentimentResult[] => {
  const predefinedScores = [0.7, -0.3, 0.1, -0.8, 0.5, -0.1, 0.9, -0.6, 0.0, 0.4];
  
  return articles.map((article, index) => {
    const score = predefinedScores[index % predefinedScores.length];
    let sentiment: 'positive' | 'negative' | 'neutral';
    
    if (score > 0.1) sentiment = 'positive';
    else if (score < -0.1) sentiment = 'negative';
    else sentiment = 'neutral';

    return {
      articleId: article.articleId,
      sentimentScore: Number(score.toFixed(3)),
      sentiment,
    };
  });
};

export const generateMockDashboardData = (startDate: string, endDate: string): DashboardData => {
  const articles = generateMockArticles(15);
  const sentimentResults = generateMockSentimentResults(articles);

  return {
    articles,
    sentimentResults,
    totalCount: articles.length,
    dateRange: { start: startDate, end: endDate },
  };
};

// Mock test account credentials
export const MOCK_ACCOUNT = {
  email: 'test@example.com',
  password: 'password123',
};

// Mock authentication function
export const authenticateUser = (email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (email === MOCK_ACCOUNT.email && password === MOCK_ACCOUNT.password) {
        resolve({
          success: true,
          user: {
            userId: 'mock-user-1',
            email,
            preferences: {
              topics: ['Economy', 'Technology'],
              sources: ['Reuters', 'Bloomberg'],
              sentimentThreshold: 0.5,
            },
            createdAt: new Date().toISOString(),
          },
        });
      } else {
        resolve({
          success: false,
          error: 'Invalid email or password',
        });
      }
    }, 1000);
  });
};

export const mockAuthResponse = {
  success: (email: string) => ({
    token: 'mock-jwt-token-123456789',
    user: {
      userId: 'mock-user-1',
      email,
      preferences: {
        topics: ['Economy', 'Technology'],
        sources: ['Reuters', 'Bloomberg'],
        sentimentThreshold: 0.5,
      },
      createdAt: new Date().toISOString(),
    },
  }),
  
  error: {
    invalidCredentials: 'Invalid email or password',
    emailExists: 'An account with this email already exists',
    networkError: 'Network error. Please try again.',
  },
};