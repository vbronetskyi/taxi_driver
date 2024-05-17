import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'admin' && password === 'admin') {
      navigate('/admin');
      return;
    }

    const userCredentials = localStorage.getItem(email);
    if (!userCredentials) {
      setMessage("User not found. Please register.");
      setMessageType('error');
      return;
    }

    const userData = JSON.parse(userCredentials);
    if (userData.password === password) {
      localStorage.setItem('currentUser', email);
      localStorage.setItem('isLoggedIn', 'true'); //flag that mark user logged in
      window.location.href = '/profile';
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
