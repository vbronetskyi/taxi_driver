import React from 'react';
import './MainPage.css';

function MainPage() {
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <nav className="main-nav">
          <ul>
            <li><a href="/">Main</a></li>
            <li><a href="/map">Map</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
        <div className="login-section">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Log out</button>
          ) : (
            <>
              <button className="login-btn"><a href="/login" className='without-underline'>Log in</a></button>
              <button className="register-btn"><a href="/register" className='without-underline'>Register</a></button>
            </>
          )}
        </div>
      </header>

      <section className="image-carousel">
        {}
      </section>

      <footer className="main-footer">
        {}
      </footer>
    </div>
  );
}

export default MainPage;
