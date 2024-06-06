const { fetchGoogleTrends, fetchNews } = require('../services/fetchData');

const searchStocks = async (req, res) => {
  const { query } = req.query;
  try {
    const googleTrends = await fetchGoogleTrends(query, query);
    const newsData = await fetchNews(query);

    res.json({ googleTrends, news: newsData.articles });
  } catch (error) {
    console.error('Error searching stocks:', error.message);
    let errorMessage = 'An unexpected error occurred';
    if (error.message.includes('API rate limit reached')) {
      errorMessage = 'API rate limit reached. Please try again later.';
    } else if (error.message.includes('Invalid stock symbol')) {
      errorMessage = 'Invalid stock symbol';
    }
    res.status(500).json({ error: errorMessage });
  }
};

  

module.exports = { searchStocks };
