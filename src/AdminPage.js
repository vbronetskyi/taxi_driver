import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './AdminPage.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function AdminPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const mapRef = useRef();

  const geocodeLocation = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        alert('Failed to get address');
      }
    });
  };

  const handleMapClick = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setLocation(latLng);
    geocodeLocation(latLng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      name,
      phone,
      location,
      address,
      id: Date.now(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setName('');
    setPhone('');
    setLocation(null);
    setAddress('');
  };

  return (
    <div className="admin-page">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            readOnly
          />
        </div>
        <button type="submit">Add Order</button>
      </form>
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyBFZBQ1gPyJcp1NMDNs_1P22ThRMhYZdg4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 49.8429, lng: 24.0263 }}
            zoom={13}
            onClick={handleMapClick}
            onLoad={(map) => mapRef.current = map}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default AdminPage;
