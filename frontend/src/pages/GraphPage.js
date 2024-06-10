import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchStocks } from '../services/api';
import { Line } from 'react-chartjs-2';
import ProgressBar from '../components/ProgressBar';
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
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0); // Add state for loading progress
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchStocks(symbol);

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(interval);
          }
          setLoadingProgress(progress);
        }, 100);

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
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error.response ? error.response.data.error : 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="graph-page">
      {loading ? (
        <div className="loading-container">
          <h1>We're crunching the numbers!</h1>
          <p>Please be patient as this may take a few seconds.</p>
          <ProgressBar progress={loadingProgress} />
        </div>
      ) : (
        <>
          <h1>Stock Data for <span className="stock-symbol">{symbol}</span></h1>
          {error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <>
              <div className="chart-container">
                <Line data={chartData} />
              </div>
              <div className="news-button-container">
                <button onClick={() => navigate(`/news?symbol=${symbol}`, { state: { newsData } })}>View News Articles</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GraphPage;
