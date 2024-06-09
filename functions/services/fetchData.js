const axios = require("axios");
const Trend = require("../models/trend");
const Stock = require("../models/stock");
const News = require('../models/news');
const NewsAPI = require('newsapi');

const fetchGoogleTrends = async (keyword, stockSymbol) => {
  const apiKey = process.env.SERPAPI_KEY;
  const trendsUrl = `https://serpapi.com/search.json?engine=google_trends&q=${keyword}&api_key=${apiKey}`;
  const alphaVantageApiKey = process.env.ALPHAVANTAGE_API_KEY;
  const companyUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${alphaVantageApiKey}`;

  try {
    // Validate the stock symbol
    const companyResponse = await axios.get(companyUrl);
    console.log('AlphaVantage company response:', companyResponse.data);

    if (companyResponse.data.Note || companyResponse.data.Information) {
      // Handle rate limit error or other informational responses
      throw new Error("API rate limit reached or invalid API key");
    }

    if (!companyResponse.data.Name) {
      throw new Error("Invalid stock symbol");
    }
    const companyName = companyResponse.data.Name;

    // Fetch Google Trends data
    const response = await axios.get(trendsUrl);
    console.log('Google Trends response:', response.data);

    const trendData = response.data.interest_over_time.timeline_data
      .map((item) => ({
        date: item.date,
        value:
          item.values &&
          item.values[0] &&
          item.values[0].extracted_value !== undefined
            ? item.values[0].extracted_value
            : null,
      }))
      .filter((item) => item.value !== null); // Filter out invalid items

    if (trendData.length === 0) {
      throw new Error("No valid trend data found");
    }

    // Check if the stock already exists in the Stock collection
    let stock = await Stock.findOne({ symbol: stockSymbol });
    if (!stock) {
      stock = new Stock({ symbol: stockSymbol, name: companyName });
      await stock.save();
    }

    // Check for existing trend data
    const existingTrend = await Trend.findOne({ stockSymbol, keyword });
    if (existingTrend) {
      // Update the existing trend data
      existingTrend.trendValues = trendData;
      existingTrend.fetchedAt = Date.now();
      await existingTrend.save();
    } else {
      // Create a new trend entry
      const trend = new Trend({ stockSymbol, keyword, trendValues: trendData });
      await trend.save();
    }

    return trendData;
  } catch (error) {
    console.error(
      "Error fetching Google Trends or company data:",
      error.message
    );
    throw error;
  }
};



const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = async (symbol) => {
  try {
    const response = await newsapi.v2.everything({
      q: symbol,
      language: 'en',
      sortBy: 'relevancy',
      pageSize: 100, // Max articles to fetch
    });

    const articles = response.articles;

    const newsData = articles.map(article => ({
      stockSymbol: symbol,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: new Date(article.publishedAt),
      source: article.source.name,
      content: article.content,
    }));

    console.log(`Fetched ${newsData.length} news articles for symbol: ${symbol}`);

    await News.insertMany(newsData, { ordered: false });

    return { count: articles.length, articles };
  } catch (error) {
    console.error('Error fetching news data:', error.message);
    throw error;
  }
};


const fetchSocialMediaMentions = async (symbol) => {
  // Implement API call to Twitter, Reddit, StockTwits, etc.
};
// const fetchSocialMediaMentions = async (symbol) => {
//     const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
//     const url = `https://api.twitter.com/2/tweets/search/recent?query=${symbol}`;

//     try {
//       const response = await axios.get(url, {
//         headers: {
//           'Authorization': `Bearer ${twitterBearerToken}`,
//         },
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching Twitter data:', error.message);
//       throw error;
//     }
//   };

//   // Fetch social media mentions from Reddit (example)
//   const fetchRedditMentions = async (symbol) => {
//     const url = `https://www.reddit.com/search.json?q=${symbol}`;

//     try {
//       const response = await axios.get(url);
//       return response.data.data.children.map(post => post.data);
//     } catch (error) {
//       console.error('Error fetching Reddit data:', error.message);
//       throw error;
//     }
//   };

module.exports = {
  fetchGoogleTrends,
  fetchNews,
  fetchSocialMediaMentions,
  //fetchRedditMentions,
};
