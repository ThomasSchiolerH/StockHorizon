const { fetchGoogleTrends, fetchNews } = require('../services/fetchData');

const searchStocks = async (req, res) => {
    const { query } = req.query;
    try {
      const googleTrends = await fetchGoogleTrends(query, query);
      const newsData = await fetchNews(query);
  
      res.json({ googleTrends, news: newsData.articles });
    } catch (error) {
      console.error('Error searching stocks:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { searchStocks };
