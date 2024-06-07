import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const searchStocks = async (query) => {
  return await axios.get(`${API_URL}/search`, { params: { query } });
};

export const fetchNews = async (symbol) => {
  return await axios.get(`${API_URL}/news?symbol=${symbol}`);
};

export const fetchTrendingStocks = async () => {
  return await axios.get(`${API_URL}/trends/trending-overview`);
};