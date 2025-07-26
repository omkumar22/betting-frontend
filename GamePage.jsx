// File: GamePage.jsx
import React, { useEffect, useState } from 'react';

const GamePage = ({ user, setUser }) => {
  const [timer, setTimer] = useState(30);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState({ type: 'number', value: '', amount: 0 });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          runRound();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const runRound = () => {
    const randomNum = Math.floor(Math.random() * 10);
    const colors = ['Red', 'Green', 'Violet'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const bigSmall = randomNum <= 4 ? 'Small' : 'Big';
    const res = { number: randomNum, color: randomColor, size: bigSmall };
    setResult(res);
    setHistory((prev) => [res, ...prev.slice(0, 9)]);

    let payout = 0;
    if (bet.type === 'number' && parseInt(bet.value) === randomNum) {
      payout = bet.amount * 8.75;
    } else if (bet.type === 'color' && bet.value.toLowerCase() === randomColor.toLowerCase()) {
      payout = bet.value.toLowerCase() === 'violet' ? bet.amount * 3 : bet.amount * 2;
    } else if (bet.type === 'size' && bet.value.toLowerCase() === bigSmall.toLowerCase()) {
      payout = bet.amount * 1.85;
    }
    if (payout > 0) {
      setUser((prevUser) => ({ ...prevUser, balance: prevUser.balance + payout }));
      alert(`🎉 You won ₹${payout.toFixed(2)}!`);
    }
  };

  const handleBet = () => {
    if (timer <= 5) {
      alert('Betting is closed for this round!');
      return;
    }
    if (bet.amount > user.balance) {
      alert('Insufficient balance');
      return;
    }
    if (!bet.value || bet.amount <= 0) {
      alert('Please enter valid prediction and amount.');
      return;
    }
    setUser({ ...user, balance: user.balance - bet.amount });
    alert(`Bet placed on ${bet.type} = ${bet.value} for ₹${bet.amount}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome, {user.username}</h2>
        <p>Balance: ₹{user.balance.toFixed(2)}</p>
        <p>Timer: {timer}s</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="text-black p-2 rounded"
          value={bet.type}
          onChange={(e) => setBet({ ...bet, type: e.target.value })}
        >
          <option value="number">Number (0-9)</option>
          <option value="color">Color (Red, Green, Violet)</option>
          <option value="size">Small / Big</option>
        </select>

        <input
          type="text"
          placeholder="Your Prediction"
          value={bet.value}
          onChange={(e) => setBet({ ...bet, value: e.target.value })}
          className="text-black p-2 rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={bet.amount}
          onChange={(e) => setBet({ ...bet, amount: parseInt(e.target.value) })}
          className="text-black p-2 rounded"
        />
      </div>

      <button
        onClick={handleBet}
        className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white font-bold"
      >
        Place Bet
      </button>

      {result && (
        <div className="mt-6 text-lg">
          <h3>Last Result:</h3>
          <p>Number: {result.number}</p>
          <p>Color: {result.color}</p>
          <p>Size: {result.size}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">History (Last 10 Rounds)</h3>
        <ul className="space-y-1">
          {history.map((h, idx) => (
            <li key={idx} className="bg-white/10 rounded p-2">
              #{idx + 1} ➤ Number: {h.number}, Color: {h.color}, Size: {h.size}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePage;