const {
  fetchGoogleTrends,
  fetchNews,
  fetchSocialMediaMentions,
} = require("../services/fetchData");
const Trend = require("../models/trend");
const News = require("../models/news");
const {
  fetchNewsCountsForStocks,
  fetchTrendingStocksFromFinnhub,
  fetchStockDetails,
  fetchStockDetailsFromAlphaVantage,
  fetchTrendingStocksFromAlphaVantage,
  fetchTrendingStocksFromPolygon,
  fetchStockDetailsFromPolygon,
} = require("../services/fetchDataOverview");

const getTrendingStocks = async (req, res) => {
  try {
    const keyword = req.query.keyword || "stocks";
    const stockSymbol = req.query.symbol || "AAPL";

    // Fetch Google Trends data
    let googleTrends = await fetchGoogleTrends(keyword, stockSymbol);

    // Get the current date
    const currentDate = new Date();

    // Check if the last data point includes the current date and remove it if necessary
    if (googleTrends.length > 0) {
      const lastDataPoint = googleTrends[googleTrends.length - 1];
      const daysInterval = (googleTrends[googleTrends.length - 1].date - googleTrends[googleTrends.length - 2].date) / (1000 * 3600 * 24);
      if ((currentDate - lastDataPoint.date) / (1000 * 3600 * 24) < daysInterval) {
        googleTrends.pop();
      }
    }

    // Fetch the latest trends from the database
    const trends = await Trend.find({ keyword, stockSymbol }).sort({
      fetchedAt: -1,
    });

    // Fetch news data
    const newsData = await fetchNews(stockSymbol);

    res.json({ googleTrends, trends, newsCount: newsData.count });
  } catch (error) {
    console.error("Error getting trending stocks:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getTrendingOverview = async (req, res) => {
  try {
    const stockSymbols = await fetchTrendingStocksFromFinnhub();
    //const stockSymbols = await fetchTrendingStocksFromAlphaVantage();
    //const stockSymbols = await fetchTrendingStocksFromPolygon();
    const newsCounts = await fetchNewsCountsForStocks(stockSymbols);

    const combinedData = await Promise.all(
      stockSymbols.map(async (symbol) => {
        const stockDetails = await fetchStockDetails(symbol);
        //const stockDetails = await fetchStockDetailsFromAlphaVantage(symbol);
        //const stockDetails = await fetchStockDetailsFromPolygon(symbol);
        return {
          stockSymbol: symbol,
          totalNewsCount: newsCounts[symbol] || 0,
          stockDetails,
        };
      })
    );

    combinedData.sort((a, b) => b.totalNewsCount - a.totalNewsCount);

    res.json(combinedData);
  } catch (error) {
    console.error("Error getting trending overview:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTrendingStocks,
  getTrendingOverview,
};
