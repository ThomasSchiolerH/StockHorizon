// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import TrendingStocks from './pages/TrendingStocks';
import Search from './pages/Search';
import TrendingAlerts from './pages/TrendingAlerts';
import TrendingTopics from './pages/TrendingTopics';
import Dashboard from './pages/Dashboard';
import HandleRedirect from './components/HandleRedirect';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <HandleRedirect />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending-stocks" element={<TrendingStocks />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending-alerts" element={<TrendingAlerts />} />
            <Route path="/trending-topics" element={<TrendingTopics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
