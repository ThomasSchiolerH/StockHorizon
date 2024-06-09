const axios = require("axios");
const NewsAPI = require("newsapi");
const trend = require("../models/trend");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const yahooFinance = require("yahoo-finance2").default;

const cache = {};

const fetchTrendingStocksFromFinnhub = async () => {
  try {
    const response = await axios.get(
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=" +
        process.env.FINNHUB_API_KEY
    );
    const trendingStocks = response.data
      .map((stock) => stock.symbol)
      .slice(0, 30); // Limit to top 30
    return trendingStocks;
  } catch (error) {
    console.error(
      "Error fetching trending stocks from Finnhub:",
      error.message
    );
    throw error;
  }
};

const fetchTrendingStocksFromAlphaVantage = async () => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = response.data;

    // Process the response to extract trending stocks information
    const stockSymbols = Object.keys(data["Time Series (1min)"]).slice(0, 30);
    return stockSymbols;
  } catch (error) {
    console.error(
      "Error fetching trending stocks from Alpha Vantage:",
      error.message
    );
    throw error;
  }
};

const fetchNewsCountsForStocks = async (symbols) => {
  const newsCounts = {};
  const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
  try {
    for (const symbol of symbols) {
      const response = await newsapi.v2.everything({
        q: symbol,
        language: "en",
        sortBy: "relevancy",
        pageSize: 100,
      });
      newsCounts[symbol] = response.totalResults || response.articles.length;
    }
    return newsCounts;
  } catch (error) {
    console.error("Error fetching news data:", error.message);
    throw error;
  }
};

const fetchStockDetails = async (symbol) => {
  if (cache[symbol]) {
    return cache[symbol];
  }

  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    const stockDetails = {
      name: response.data.name,
      logo: response.data.logo,
      marketCap: response.data.marketCapitalization,
      currentPrice: response.data.tickerPrice,
      ...response.data,
    };
    cache[symbol] = stockDetails;
    return stockDetails;
  } catch (error) {
    console.error(`Error fetching details for stock ${symbol}:`, error.message);
    throw error;
  }
};

const fetchStockDetailsFromAlphaVantage = async (symbol) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = response.data;
    return {
      name: data.Name,
      //logo: `https://example.com/logos/${symbol}.png`, // Alpha Vantage doesn't provide logos, so you'll need an alternative source
      marketCap: data.MarketCapitalization,
      currentPrice: data.MarketPrice,
    };
  } catch (error) {
    console.error(`Error fetching details for stock ${symbol}:`, error.message);
    throw error;
  }
};

const fetchTrendingStocksFromPolygon = async () => {
  try {
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-06-02?apiKey=${process.env.POLYGON_API_KEY}`
    );
    const data = response.data;

    // Extract stock symbols based on criteria such as highest trading volume or price change
    const stockSymbols = data.results
      .sort((a, b) => b.t - a.t)
      .slice(0, 30)
      .map((stock) => stock.T); // Sort by trading volume and get top 30
    return stockSymbols;
  } catch (error) {
    console.error(
      "Error fetching trending stocks from Polygon:",
      error.message
    );
    throw error;
  }
};

const fetchStockDetailsFromPolygon = async (symbol) => {
  if (cache[symbol]) {
    return cache[symbol];
  }

  try {
    const response = await axios.get(
      `https://api.polygon.io/v1/meta/symbols/${symbol}/company?apiKey=${process.env.POLYGON_API_KEY}`
    );
    const data = response.data;
    const stockDetails = {
      name: data.name,
      logo: data.logo, // Polygon provides logos
      marketCap: data.marketCap,
      currentPrice: data.price,
      ...data,
    };
    cache[symbol] = stockDetails;
    return stockDetails;
  } catch (error) {
    console.error(`Error fetching details for stock ${symbol}:`, error.message);
    throw error;
  }
};

// const fetchTrendingKeywords = async () => {
//   const apiKey = process.env.SERPAPI_KEY;
//   const trendsUrl = `https://serpapi.com/search.json?engine=google_trends&q=stocks&api_key=${apiKey}`;

//   try {
//     const response = await axios.get(trendsUrl);
//     const keywords =
//       response.data.related_queries.default.rankedList[0].rankedKeyword.map(
//         (keyword) => keyword.query
//       );

//     if (keywords.length === 0) {
//       throw new Error("No trending keywords found");
//     }

//     return keywords;
//   } catch (error) {
//     console.error("Error fetching Google Trends data:", error.message);
//     throw error;
//   }
// };

// const fetchTrendingStocksFromGoogleTrends = async (keyword) => {
//   const apiKey = process.env.SERPAPI_KEY;
//   const trendsUrl = `https://serpapi.com/search.json?engine=google_trends&q=${keyword}&api_key=${apiKey}`;

//   try {
//     const response = await axios.get(trendsUrl);
//     const trendData = response.data.interest_over_time.timeline_data
//       .map((item) => ({
//         date: item.date,
//         value:
//           item.values &&
//           item.values[0] &&
//           item.values[0].extracted_value !== undefined
//             ? item.values[0].extracted_value
//             : null,
//       }))
//       .filter((item) => item.value !== null); // Filter out invalid items

//     if (trendData.length === 0) {
//       throw new Error("No valid trend data found");
//     }

//     // Assuming trendData includes stock symbols in some way
//     const stockSymbols = trendData.map((item) => item.stockSymbol); // Update this based on actual data structure

//     return { trendData, stockSymbols };
//   } catch (error) {
//     console.error("Error fetching Google Trends data:", error.message);
//     throw error;
//   }
// };

module.exports = {
  fetchNewsCountsForStocks,
  fetchTrendingStocksFromFinnhub,
  fetchStockDetails,
  fetchStockDetailsFromAlphaVantage,
  fetchTrendingStocksFromAlphaVantage,
  fetchTrendingStocksFromPolygon,
  fetchStockDetailsFromPolygon,
};
