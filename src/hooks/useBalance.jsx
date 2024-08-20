import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const balance = await provider.getBalance(await signer.getAddress());
      setBalance(ethers.utils.formatEther(balance));
      setLoading(false);
    };

    fetchBalance();
  }, []);

  return { balance, loading };
}
