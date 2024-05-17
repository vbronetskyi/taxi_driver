import React from 'react';
import MainPage from './MainPage';
import './EnterPage.css';

function EnterPage() {
  return (
    <div className="enter-page">
      <MainPage />
      <div className="additional-content">
        <h1>Welcome to Our Service!</h1>
        <p>Explore our services and see how we can enhance your daily commutes and travels. Whether you need to plan a trip, book a ride, or get traffic updates, we have everything you need!</p>
        
        <div className="features">
          <div className="feature">
            <h2>Plan Your Trip</h2>
            <p>Utilize our interactive planning tools to map out your next journey.</p>
          </div>
          <div className="feature">
            <h2>Real-Time Updates</h2>
            <p>Stay up-to-date with real-time traffic information and travel advisories.</p>
          </div>
          <div className="feature">
            <h2>User Support</h2>
            <p>Have questions? Our dedicated support team is here to help you 24/7.</p>
          </div>
        </div>

        <div className="call-to-action">
          <button onClick={() => window.location.href='/register'}>Join Us Today</button>
          <button onClick={() => window.location.href='/login'}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default EnterPage;
