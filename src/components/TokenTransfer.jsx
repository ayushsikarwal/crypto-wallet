import React, { useState } from 'react';
import { ethers } from 'ethers';

function TokenTransfer() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleTransfer = async () => {
    try {
      if (!recipient || !amount) {
        setStatus('Please fill out both fields.');
        return;
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum); // Updated provider
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount), // Updated for ethers v6
      });
      
      await tx.wait();
      setStatus('Transfer successful!');
    } catch (error) {
      console.error('Error transferring tokens:', error);
      setStatus('Transfer failed.');
    }
  };

  return (
    <div className="token-transfer">
      <h2>Token Transfer</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }}>
        <label>
          Recipient Address:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </label>
        <label>
          Amount (ETH):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            step="any"
          />
        </label>
        <button type="submit">Transfer</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default TokenTransfer;