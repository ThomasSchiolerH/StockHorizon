import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const searchStocks = async (query) => {
  return await axios.get(`${API_URL}/search`, { params: { query } });
};

export const fetchNews = async (symbol) => {
  return await axios.get(`${API_URL}/news?symbol=${symbol}`);
};

export const fetchTrendingStocks = async () => {
  // return await axios.get(`${API_URL}/trends/trending-overview`);
  return {
    status: 200,
    data: [
      {
        stockSymbol: 'AAPL',
        totalNewsCount: 164,
        stockDetails: {
          name: 'Apple Inc.',
          logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png',
          marketCap: 2743000000000,
          finnhubIndustry: 'Technology',
        },
        sentiment: 'Positive',
      },
      {
        stockSymbol: 'GOOGL',
        totalNewsCount: 150,
        stockDetails: {
          name: 'Alphabet Inc.',
          logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOGL.png',
          marketCap: 1824000000000,
          finnhubIndustry: 'Technology',
        },
        sentiment: 'Neutral',
      },
      {
        stockSymbol: 'AMZN',
        totalNewsCount: 140,
        stockDetails: {
          name: 'Amazon.com Inc.',
          logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png',
          marketCap: 1633000000000,
          finnhubIndustry: 'Consumer Discretionary',
        },
        sentiment: 'Negative',
      },
      {
        stockSymbol: 'MSFT',
        totalNewsCount: 130,
        stockDetails: {
          name: 'Microsoft Corp.',
          logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png',
          marketCap: 2290000000000,
          finnhubIndustry: 'Technology',
        },
        sentiment: 'Positive',
      },
      {
        stockSymbol: 'TSLA',
        totalNewsCount: 120,
        stockDetails: {
          name: 'Tesla Inc.',
          logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png',
          marketCap: 800000000000,
          finnhubIndustry: 'Automobiles',
        },
        sentiment: 'Neutral',
      },
    ],
  };
};
