import React, { useState } from 'react';

function TokenWatchList() {
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState('');

  const addToken = () => {
    if (newToken) {
      setTokens([...tokens, newToken]);
      setNewToken('');
    }
  };

  return (
    <div>
      <h2>Token Watch List</h2>
      <input
        type="text"
        value={newToken}
        onChange={(e) => setNewToken(e.target.value)}
        placeholder="Enter token address"
      />
      <button onClick={addToken}>Add Token</button>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>{token}</li>
        ))}
      </ul>
    </div>
  );
}

export default TokenWatchList;
