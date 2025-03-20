// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';  // Import global CSS
import './styles/navbar.css';  // Import navbar CSS for the sidebar

// Import your pages (e.g., Login, SignUp, ChatPage, etc.)
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChatPage from './pages/ChatPage';
import UserFeedback from './pages/UserFeedback';
import FinancialGlossary from './pages/FinancialGlossary';

// Import logo image
import logo from './assets/logo.png';

// Import react-toastify components
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

// Import ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);  // Persist dark mode state in localStorage
    document.body.classList.toggle('dark-mode', newDarkMode);  // Toggle dark mode class on body
  };

  // Apply the initial dark mode state on page load
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div>
        <header className="header" style={{ padding: "0px 10px" }}>
          <img src={logo} style={{ width: '150px' }} alt="FinGPT Logo" className="logo-image" />
          <nav className="navbar">
            <ul>
              <li><Link to="/chat" className="navbar-link">Chat</Link></li>
              <li><Link to="/financial-glossary" className="navbar-link">Financial Glossary</Link></li>
              <li><Link to="/feedback" className="navbar-link">User Feedback</Link></li>
            </ul>
          </nav>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            Toggle Dark Mode
          </button>
        </header>

        <div className="main-container">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Protected Routes */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-glossary"
                element={
                  <ProtectedRoute>
                    <FinancialGlossary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute>
                    <UserFeedback />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>

        {/* Toast notifications container */}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
      </div>
    </Router>
  );
}

export default App;


