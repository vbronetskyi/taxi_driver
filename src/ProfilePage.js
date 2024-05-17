import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    languages: [],
    rating: 0,
    photo: '',
  });

  useEffect(() => {
    const username = localStorage.getItem('currentUser'); // Змініть згідно з вашою логікою аутентифікації
    const storedUserData = JSON.parse(localStorage.getItem(username));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "languages") {
      setUserData(prevUserData => ({
        ...prevUserData,
        [name]: Array.from(e.target.selectedOptions, option => option.value),
      }));
    } else {
      setUserData(prevUserData => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    const username = localStorage.getItem('currentUser');
    localStorage.setItem(username, JSON.stringify(userData));
    alert('Profile updated successfully.');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const username = localStorage.getItem('currentUser');
      localStorage.removeItem(username);
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login'; // Redirect to login after account deletion
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login'; // Redirect to login
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prevUserData => ({
        ...prevUserData,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-photo">
        {userData.photo ? <img src={userData.photo} alt="Profile" /> : <p>No photo uploaded</p>}
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
          {/* Додайте інші мови за потребою */}
        </select>
        <button className="save-changes-btn" onClick={handleSaveChanges}>Save Changes</button>
      </div>
      <div className="profile-actions">
        <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default ProfilePage;
