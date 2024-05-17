import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import DriverMapPage from './DriverMapPage';
import RegisterPage from './RegisterPage';
import EnterPage from './EnterPage';
import MainPage from './MainPage';
import AdminPage from './AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <MainPage />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/map" element={<DriverMapPage />} />
          <Route path="/main" element={<EnterPage />} />
          <Route path="/" element={<EnterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
