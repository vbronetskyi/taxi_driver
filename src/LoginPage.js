import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = () => {
    const userDataString = localStorage.getItem(username);
    if (!userDataString) {
      setMessage("User not found. Please register.");
      setMessageType('error');
      return;
    }

    const userData = JSON.parse(userDataString);
    if (userData.password === password) {
      localStorage.setItem('isLoggedIn', 'true'); // Mark the user as logged in
      window.location.href = '/'; // Redirect to the home page or another appropriate page
    } else {
      setMessage("Incorrect password.");
      setMessageType('error');
    }
  };

  return (
    <div className="login-page">
      <h2>Log in</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
