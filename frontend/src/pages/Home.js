import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the corresponding CSS file

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/graph/${searchQuery}`);
  };

  return (
    <div className="home-page">
      <h1>Gain A Trading Advantage</h1>
      <p>Tie news to your investments, by leveraging data from multiple sources.</p>
      <div className="search-bar">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search for a stock..." 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="login-placeholder">
        <button onClick={() => navigate('/signup')}>Sign in with Google (Placeholder)</button>
      </div>
    </div>
  );
};

export default Home;
