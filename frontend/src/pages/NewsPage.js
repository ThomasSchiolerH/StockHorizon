import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NewsPage.css'; // Import the corresponding CSS file

const NewsPage = () => {
  const location = useLocation();
  const { newsData } = location.state || { newsData: [] };

  return (
    <div className="news-page">
      <h1>News Articles</h1>
      <div className="news-list">
        {newsData.length > 0 ? (
          newsData.map((article, index) => (
            <div key={index} className="news-article">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))
        ) : (
          <p>No news articles available.</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
