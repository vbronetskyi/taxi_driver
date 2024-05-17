import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const popularLanguages = ["English", "Spanish", "Mandarin", "French", "German", "Arabic", "Hindi", "Bengali", "Russian", "Portuguese", "Ukrainian"];

  const validateForm = () => {
    const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    const phoneRegex = /^\+[0-9]{9,15}$/;
    const emailRegex = /.*@.*/;

    if (!nameRegex.test(fullName)) {
      setMessage("Full name must consist of first and last name, starting with capital letters, and only contain letters.");
      setMessageType('error');
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setMessage("Phone number must start with + and contain 10 to 16 digits.");
      setMessageType('error');
      return false;
    }

    if (!emailRegex.test(email)) {
      setMessage("Email must contain '@'.");
      setMessageType('error');
      return false;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType('error');
      return false; 
    }

    if (localStorage.getItem(email)) {
      setMessage("An account with this email already exists.");
      setMessageType('error');
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const userData = { username, email, password, fullName, phoneNumber, languages };
      localStorage.setItem(email, JSON.stringify(userData));
      localStorage.setItem('currentUser', email);
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/profile';
      setMessage("Registration successful. You are now logged in.");
      setMessageType('success');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <select
          multiple={true}
          value={languages}
          onChange={(e) => setLanguages([...e.target.selectedOptions].map(option => option.value))}
          size={5}
        >
          {popularLanguages.map((language) => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterPage;
