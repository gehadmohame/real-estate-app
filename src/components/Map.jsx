import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useMemo, useEffect } from "react";

export default function Map({ lat, lng, onSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBQfLBDFs713gW-9V8ul9URwD5dIn2EsUw",
  });

  const [position, setPosition] = useState({
    lat: lat || 30.0444,
    lng: lng || 31.2357,
  });

  useEffect(() => {
    setPosition({
      lat: lat || 30.0444,
      lng: lng || 31.2357,
    });
  }, [lat, lng]);

  const center = useMemo(() => position, [position]);

  const containerStyle = {
    width: "100%",
    height: "350px",
    borderRadius: "12px",
  };

  if (!isLoaded) {
    return <p style={{ textAlign: "center" }}>Loading map...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={(e) => {
        const newPos = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        setPosition(newPos);

        if (onSelect) {
          onSelect(newPos);
        }
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}