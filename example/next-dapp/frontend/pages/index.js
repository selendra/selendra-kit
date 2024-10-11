import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';

function App() {
  const { address, balance, mintTokens, burnTokens } = useContract();
  const [amount, setAmount] = useState('');

  const handleMint = async () => {
    if (amount) {
      await mintTokens(amount);
      setAmount('');
    }
  };

  const handleBurn = async () => {
    if (amount) {
      await burnTokens(amount);
      setAmount('');
    }
  };

  return (
    <div className="App">
      <h1>Sample Asset Token</h1>
      <p>Connected Address: {address}</p>
      <p>Token Balance: {balance}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleMint}>Mint Tokens</button>
      <button onClick={handleBurn}>Burn Tokens</button>
    </div>
  );
}

export default App;