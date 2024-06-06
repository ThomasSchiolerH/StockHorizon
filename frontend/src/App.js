// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GraphPage from './pages/GraphPage';
import NewsPage from './pages/NewsPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EmailActionHandler from './pages/EmailActionHandler';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './contexts/AuthContext';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph/:symbol" element={<GraphPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/__/auth/action" element={<EmailActionHandler />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
