import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function TokenBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Token Balance</h2>
      <p>Balance: {balance} ETH</p>
    </div>
  );
}

export default TokenBalance;
