// src/components/Sidebar.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css"; // Make sure to create this CSS file

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icon" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <nav className="sidebar-nav">
        <div
          className={`sidebar-item ${location.pathname === "/trending-stocks" ? "active" : ""}`}
          onClick={() => navigate("/trending-stocks")}
        >
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"></path>
            </svg>
          </div>
          <span className="text">Trending Stocks</span>
        </div>
        <div
          className={`sidebar-item ${location.pathname === "/search" ? "active" : ""}`}
          onClick={() => navigate("/search")}
        >
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </div>
          <span className="text">Search</span>
        </div>
        <div
          className={`sidebar-item ${location.pathname === "/trending-alerts" ? "active" : ""}`}
          onClick={() => navigate("/trending-alerts")}
        >
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M12 22c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6-6v-5c0-3.071-1.641-5.641-4.5-6.32V4c0-.828-.672-1.5-1.5-1.5S10 3.172 10 4v.68C7.141 5.359 5.5 7.929 5.5 11v5l-1.5 1.5V19h16v-1.5l-1.5-1.5z"></path>
            </svg>
          </div>
          <span className="text">Trending Alerts</span>
        </div>
        <div
          className={`sidebar-item ${location.pathname === "/trending-topics" ? "active" : ""}`}
          onClick={() => navigate("/trending-topics")}
        >
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.766L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.234V16H4V4h16v12z"></path>
              <circle cx="15" cy="10" r="2"></circle>
              <circle cx="9" cy="10" r="2"></circle>
            </svg>
          </div>
          <span className="text">Trending Topics</span>
        </div>
        <div
          className={`sidebar-item ${location.pathname === "/dashboard" ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
            </svg>
          </div>
          <span className="text">My Dashboard</span>
        </div>
      </nav>
      <div className="sidebar-footer">
        {currentUser ? (
          <div className={`sidebar-item ${location.pathname === "/logout" ? "active" : ""}`} onClick={handleLogout}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
              >
                <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
              </svg>
            </div>
            <span className="text">Logout</span>
          </div>
        ) : (
          <div className={`sidebar-item ${location.pathname === "/signup" ? "active" : ""}`} onClick={() => navigate("/signup")}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
              >
                <path d="m13 16 5-4-5-4v3H4v2h9z"></path>
                <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
              </svg>
            </div>
            <span className="text">Signup</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
