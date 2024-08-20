import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const accounts = await provider.listAccounts();
        setWalletAddress(accounts[0]);
      }
    };

    connectWallet();
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    }
  };

  return { walletAddress, provider, connect };
}
