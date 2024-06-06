import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchStocks } from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/GraphPage.css'; // Import the corresponding CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchStocks(symbol);
        const trends = response.data.googleTrends;
        const news = response.data.news;

        // Prepare data for the chart
        const labels = trends.map(item => item.date);
        const trendValues = trends.map(item => item.value);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Trend Value',
              data: trendValues,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });

        setNewsData(news);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error.response ? error.response.data.error : 'An unexpected error occurred');
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="graph-page">
      <h1>Stock Data for {symbol}</h1>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : chartData ? (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="news-button-container">
        <button onClick={() => navigate(`/news?symbol=${symbol}`, { state: { newsData } })}>View News Articles</button>
      </div>
    </div>
  );
};

export default GraphPage;
