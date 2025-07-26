// File: App.jsx
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import GamePage from './GamePage';
import AdminPanel from './AdminPanel';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    // Dummy usernames set by admin
    const allowedUsers = ['admin', 'user1', 'user2', 'user3'];
    if (allowedUsers.includes(username)) {
      const initialBalance = username === 'admin' ? 0 : 1000;
      setUser({ username, balance: initialBalance });
    } else {
      alert('Username not allowed. Only admin-generated usernames can log in.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {user ? (
        user.username === 'admin' ? (
          <AdminPanel setUser={setUser} />
        ) : (
          <GamePage user={user} setUser={setUser} />
        )
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;