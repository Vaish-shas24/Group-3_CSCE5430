import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default latitude (e.g., San Francisco)
  lng: -122.4194, // Default longitude
};

const GoogleMapComponent = ({ setLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBqfgJGORFiYxXpV2rFlEpPLyNErA1Q2oM&libraries=places", // Replace with your API key
  });

  const markerRef = useRef(null);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const locationString = `${lat},${lng}`;
    setLocation(locationString); // Update parent component's location
  }, [setLocation]);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      onClick={onMapClick}
    >
      {markerRef.current && (
        <Marker
          position={{
            lat: parseFloat(markerRef.current.lat),
            lng: parseFloat(markerRef.current.lng),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
