const axios = require("axios");
const Trend = require("../models/trend");
const Stock = require("../models/stock");

const fetchGoogleTrends = async (keyword, stockSymbol) => {
  const apiKey = process.env.SERPAPI_KEY;
  const trendsUrl = `https://serpapi.com/search.json?engine=google_trends&q=${keyword}&api_key=${apiKey}`;
  const alphaVantageApiKey = process.env.ALPHAVANTAGE_API_KEY;
  const companyUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${alphaVantageApiKey}`;

  try {
    // Fetch Google Trends data
    const response = await axios.get(trendsUrl);
    console.log(
      "Google Trends API response:",
      JSON.stringify(response.data, null, 2)
    );

    const trendData = response.data.interest_over_time.timeline_data
      .map((item) => {
        const value =
          item.values &&
          item.values[0] &&
          item.values[0].extracted_value !== undefined
            ? item.values[0].extracted_value
            : null;
        if (value === null) {
          console.error("Invalid item in timeline_data:", item);
          return null;
        }
        return {
          date: item.date, // Ensure the date is correctly mapped
          value: value.toString(), // Ensure value is a string to match schema
        };
      })
      .filter((item) => item !== null); // Filter out invalid items

    if (trendData.length === 0) {
      throw new Error("No valid trend data found");
    }

    // Fetch company details
    const companyResponse = await axios.get(companyUrl);
    const companyName = companyResponse.data.Name;

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
      console.log("Trend updated in database:", existingTrend);
    } else {
      // Create a new trend entry
      const trend = new Trend({ stockSymbol, keyword, trendValues: trendData });
      await trend.save();
      console.log("Trend saved to database:", trend);
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

const fetchNews = async (symbol) => {
  // Implement API call to a news service
};
// const fetchNews = async (symbol) => {
//     const apiKey = process.env.NEWS_API_KEY;
//     const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       return response.data.articles;
//     } catch (error) {
//       console.error('Error fetching news data:', error.message);
//       throw error;
//     }
//   };

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
