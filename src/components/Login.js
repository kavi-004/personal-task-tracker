import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }
    localStorage.setItem('username', username.trim());
    console.log('Saving username:', username.trim());
    
    onLogin(username.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
