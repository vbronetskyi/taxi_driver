import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import DriverMapPage from './DriverMapPage'; 

function App() {
  return (
    <div>
      <MainPage />
    <Router>
      <div className="App">
        <Routes>
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/map" element={<DriverMapPage />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
