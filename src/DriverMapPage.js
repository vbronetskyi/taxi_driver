import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './DriverMapPage.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function DriverMapPage() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 49.8429,
    lng: 24.0263,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert('Error: The Geolocation service failed.');
      }
    );
  }, []);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    setLocations(orders);
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const fetchDirections = (destination) => {
    if (!mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin: currentLocation,
      destination: destination.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResponse(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  };

  const handleLocationSelect = (location) => {
    fetchDirections(location);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBFZBQ1gPyJcp1NMDNs_1P22ThRMhYZdg4">
      <div className="driver-map-page">
        <div className="driver-map-video-instructions">
          <div className="video-container">
            <video width="100%" controls>
              <source src="video.mp4" type="mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="instructions-container">
            <h4>How to Use the Map</h4>
            <p>Follow these instructions to learn how to navigate using the map to locate your position and reach your destination effectively.</p>
          </div>
        </div>
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={13}
            onLoad={onLoad}
            onUnmount={() => console.log('Map unmounted')}
          >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>
        <div className="location-table">
          <h4>Nearby clients</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.name}</td>
                  <td>{location.phone}</td>
                  <td>{location.address}</td>
                  <td>
                    <button onClick={() => handleLocationSelect(location)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LoadScript>
  );
}

export default DriverMapPage;
