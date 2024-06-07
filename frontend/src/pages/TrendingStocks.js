import React, { useState, useEffect } from 'react';
import StockTable from '../components/StockTable';
import { fetchTrendingStocks } from '../services/api';
import '../styles/TrendingStocks.css';

const TrendingStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingStocks = async () => {
      try {
        const response = await fetchTrendingStocks();
        setStocks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadTrendingStocks();
  }, []);

  return (
    <div className="trending-stocks-page">
      <h1>Trending Stocks</h1>
      <div className="table-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading trending stocks: {error}</p>}
        {!loading && !error && <StockTable stocks={stocks} />}
      </div>
    </div>
  );
};


// const hardcodedStocks = [
//   {
//     stockSymbol: 'AAPL',
//     totalNewsCount: 164,
//     stockDetails: {
//       name: 'Apple Inc.',
//       logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png',
//       marketCap: 2743000000000,
//       finnhubIndustry: 'Technology',
//     },
//     sentiment: 'Positive',
//   },
//   {
//     stockSymbol: 'GOOGL',
//     totalNewsCount: 150,
//     stockDetails: {
//       name: 'Alphabet Inc.',
//       logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOGL.png',
//       marketCap: 1824000000000,
//       finnhubIndustry: 'Technology',
//     },
//     sentiment: 'Neutral',
//   },
//   {
//     stockSymbol: 'AMZN',
//     totalNewsCount: 140,
//     stockDetails: {
//       name: 'Amazon.com Inc.',
//       logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png',
//       marketCap: 1633000000000,
//       finnhubIndustry: 'Consumer Discretionary',
//     },
//     sentiment: 'Negative',
//   },
//   {
//     stockSymbol: 'MSFT',
//     totalNewsCount: 130,
//     stockDetails: {
//       name: 'Microsoft Corp.',
//       logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png',
//       marketCap: 2290000000000,
//       finnhubIndustry: 'Technology',
//     },
//     sentiment: 'Positive',
//   },
//   {
//     stockSymbol: 'TSLA',
//     totalNewsCount: 120,
//     stockDetails: {
//       name: 'Tesla Inc.',
//       logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png',
//       marketCap: 800000000000,
//       finnhubIndustry: 'Automobiles',
//     },
//     sentiment: 'Neutral',
//   },
// ];

// const TrendingStocks = () => {
//   return (
//     <div className="trending-stocks-page">
//       <h1>Trending Stocks</h1>
//       <div className="table-container">
//         <StockTable stocks={hardcodedStocks} />
//       </div>
//     </div>
//   );
// };


export default TrendingStocks;
