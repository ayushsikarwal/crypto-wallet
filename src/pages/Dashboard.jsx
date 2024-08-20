import React from 'react';
import TokenWatchList from '../components/TokenWatchList';
import TokenBalance from '../components/TokenBalance';
import HistoricalData from '../components/HistoricalData';
import Allowance from '../components/Allowance';
import TokenTransfer from '../components/TokenTransfer';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <TokenWatchList />
      <TokenBalance />
      <HistoricalData />
      <Allowance />
      <TokenTransfer />
    </div>
  );
}

export default Dashboard;
