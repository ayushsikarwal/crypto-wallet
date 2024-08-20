import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Crypto Dashboard</h1>
      <p className="homepage-description">Select a page from the menu to get started.</p>
      <div className="homepage-actions">
        <button className="homepage-button" onClick={goToDashboard}>View Dashboard</button>
        <button className="homepage-button">Manage Tokens</button>
      </div>
    </div>
  );
}

export default HomePage;
