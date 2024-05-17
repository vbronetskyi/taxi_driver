// import React from 'react';

// function DriverMapPage() {
//   return (
//     <div className="driver-map-page">
//       <h2>Driver Map</h2>
//     </div>
//   );
// }

// export default DriverMapPage;

// поганий код:
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const driverLocation = [50.4501, 30.5234]; // Київ
const clientLocation = [50.45466, 30.5298]; // Трохи віддалік у Києві

function DriverMapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // Ініціалізуємо карту

    mapRef.current = L.map('map', {
      center: driverLocation,
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // локації на карті
    L.marker(driverLocation).addTo(mapRef.current)
      .bindPopup('Водій')
      .openPopup();

    L.marker(clientLocation).addTo(mapRef.current)
      .bindPopup('Клієнт')
      .openPopup();

    // Маршрут відсутній, бо Leaflet не підтримує маршрутизацію без зовнішніх API
    // Якщо робити з маршрутами, то треба бавитись із API
    // ПРосто зробив будь-як, щоб було 
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default DriverMapPage;

// Далі йде нормальний закоментований код де можна маршрути і тд і тп
// проте треба для цього зрробити API ключ 

// import React from 'react';
// import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// // Приклад положення водія
// const driverLocation = {
//   lat: 50.4501, // Київ
//   lng: 30.5234
// };

// // Приклад положення клієнта
// const clientLocation = {
//   lat: 50.45466, // Трохи віддалік у Києві
//   lng: 30.5298
// };

// function DriverMapPage() {
//   const [directions, setDirections] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     const origin = new window.google.maps.LatLng(driverLocation.lat, driverLocation.lng);
//     const destination = new window.google.maps.LatLng(clientLocation.lat, clientLocation.lng);

//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }, []);

//   return (
//     <LoadScript
//       googleMapsApiKey="YOUR_API_KEY_HERE"
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={driverLocation}
//         zoom={10}
//         onLoad={onLoad}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default DriverMapPage;
