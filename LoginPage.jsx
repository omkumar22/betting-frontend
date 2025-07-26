// File: LoginPage.jsx
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter admin-generated username"
        className="p-2 rounded text-black"
      />
      <button
        onClick={() => onLogin(username)}
        className="mt-4 bg-white text-blue-600 px-4 py-2 rounded font-bold"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;