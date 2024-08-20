import React from 'react';
import { useWallet } from '../hooks/useWallet';

function ConnectWallet() {
  const { walletAddress, connect } = useWallet();

  return (
    <div>
      <h2>Connect Wallet</h2>
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;
