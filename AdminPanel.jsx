// File: AdminPanel.jsx
import React, { useState } from 'react';

const AdminPanel = ({ setUser }) => {
  const [balances, setBalances] = useState({ user1: 1000, user2: 1000, user3: 1000 });
  const [selectedUser, setSelectedUser] = useState('user1');
  const [amount, setAmount] = useState(0);

  const handleAddFunds = () => {
    setBalances({
      ...balances,
      [selectedUser]: balances[selectedUser] + parseInt(amount),
    });
    alert(`Added ₹${amount} to ${selectedUser}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="flex gap-4 mb-4">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="text-black p-2 rounded"
        >
          <option value="user1">user1</option>
          <option value="user2">user2</option>
          <option value="user3">user3</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-black p-2 rounded"
        />
        <button
          onClick={handleAddFunds}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-bold"
        >
          Add Funds
        </button>
      </div>

      <h3 className="text-xl font-semibold">Current Balances</h3>
      <ul className="mt-2 space-y-1">
        {Object.entries(balances).map(([user, bal]) => (
          <li key={user} className="bg-white/10 rounded p-2">
            {user}: ₹{bal}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setUser(null)}
        className="mt-6 bg-red-500 hover:bg-red-700 px-4 py-2 rounded font-bold text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;