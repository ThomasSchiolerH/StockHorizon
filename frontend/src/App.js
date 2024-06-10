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
import PrivateRoute from './components/PrivateRoute';
import GraphPage from './pages/GraphPage'; 
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/trending-stocks" element={<PrivateRoute element={TrendingStocks} />} />
            <Route path="/search" element={<PrivateRoute element={Search} />} />
            <Route path="/trending-alerts" element={<PrivateRoute element={TrendingAlerts} />} />
            <Route path="/trending-topics" element={<PrivateRoute element={TrendingTopics} />} />
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/graph/:symbol" element={<GraphPage />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
