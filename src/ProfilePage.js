import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    languages: [],
    rating: 0,
    photo: 'image.jpeg',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('currentUser');
    const isLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (!email || !isLoggedInStatus) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      const userCredentials = localStorage.getItem(email);
      if (userCredentials) {
        const data = JSON.parse(userCredentials);
        setUserData(data);
      }
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="login-required">
        <p>You must be logged in to view this page.</p>
        <a href="/login">Log in</a>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: name === "languages" ? [...e.target.options].filter(option => option.selected).map(option => option.value) : value
    }));
  };

  const handleSaveChanges = () => {
    const email = localStorage.getItem('currentUser');
    localStorage.setItem(email, JSON.stringify(userData));
    alert('Profile updated successfully.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const email = localStorage.getItem('currentUser');
      localStorage.removeItem(email);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUserData(prev => ({
        ...prev,
        photo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-photo">
        <img src={userData.photo || 'image.jpeg'} alt="Profile" />
        <input type="file" onChange={handlePhotoChange} />
      </div>
      <div className="profile-info">
        <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} placeholder="Full Name" />
        <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
        <select multiple name="languages" value={userData.languages} onChange={handleChange} size="5">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Mandarin">Mandarin</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Arabic">Arabic</option>
          <option value="Hindi">Hindi</option>
          <option value="Bengali">Bengali</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Ukrainian">Ukrainian</option>
        </select>

      </div>
      <div className="profile-actions">
        <button className="save-changes-btn" onClick={handleSaveChanges}>Save Changes</button>
        <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default ProfilePage;
