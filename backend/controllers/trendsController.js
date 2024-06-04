const {
  fetchGoogleTrends,
  fetchNews,
  fetchSocialMediaMentions,
} = require("../services/fetchData");
const Trend = require("../models/trend");

const getTrendingStocks = async (req, res) => {
  try {
    const keyword = req.query.keyword || "stocks";
    const stockSymbol = req.query.symbol || "AAPL";

    // Fetch Google Trends data
    const googleTrends = await fetchGoogleTrends(keyword, stockSymbol);

    // Fetch the latest trends from the database
    const trends = await Trend.find({ keyword, stockSymbol }).sort({
      fetchedAt: -1,
    });

    res.json({ googleTrends, trends });
  } catch (error) {
    console.error("Error getting trending stocks:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTrendingStocks,
};
