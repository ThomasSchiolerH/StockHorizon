// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useTypingEffect from '../hooks/useTypingEffect';
import '../styles/Home.css'; // Import the corresponding CSS file

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META", "NFLX", "NVDA", "BABA"];
  const placeholderText = useTypingEffect(stockSymbols, 150, 100, 3000, 1000);

  useEffect(() => {
    const count = localStorage.getItem('searchCount');
    if (count) {
      setSearchCount(parseInt(count));
    }
  }, []);

  const handleSearch = () => {
    if (!currentUser && searchCount >= 1) {
      navigate('/signup', { state: { message: "Please log in to access the search feature." } });
    } else {
      if (!currentUser) {
        setSearchCount(searchCount + 1);
        localStorage.setItem('searchCount', searchCount + 1);
      }
      navigate(`/graph/${searchQuery}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home-page">
      <h1 className="title">
        Invest with
        <span className="title-confidence">Confidence</span>
      </h1>
      <p className="subtitle">Know what is trending, to gain an advantage</p>
      <div className="input__container input__container--variant">
        <div className="shadow__input shadow__input--variant"></div>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input__search input__search--variant" 
          placeholder={isFocused ? '' : placeholderText} 
        />
        <button className="input__button__shadow input__button__shadow--variant" onClick={handleSearch}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.5em" width="1.5em">
            <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#FFF"></path>
          </svg>
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign Up or Sign In</h2>
            <p>To continue using the search functionality, please sign up or sign in.</p>
            <button onClick={() => navigate('/signup')}>Sign in with Google</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
