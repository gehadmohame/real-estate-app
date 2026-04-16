import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";

import { useState, useMemo, useRef, useEffect } from "react";

export default function PropertiesMap({
  properties = [],
  selectedProperty,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBQfLBDFs713gW-9V8ul9URwD5dIn2EsUw",
    libraries: ["places"],
  });

  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null);

  // 🧭 Default center (Egypt)
  const center = useMemo(
    () => ({ lat: 30.0444, lng: 31.2357 }),
    []
  );

  // 📍 Move map when sidebar item is clicked
  useEffect(() => {
    if (!mapRef.current || !selectedProperty) return;

    const position = {
      lat: selectedProperty.lat,
      lng: selectedProperty.lng,
    };

    mapRef.current.panTo(position);
    mapRef.current.setZoom(14);
    setSelected(selectedProperty);
  }, [selectedProperty]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={center}
      zoom={6}
      onLoad={(map) => (mapRef.current = map)}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      {/* 🏡 MARKERS */}
      {properties.map((p) =>
        p.lat && p.lng ? (
          <Marker
            key={p.id}
            position={{
              lat: p.lat,
              lng: p.lng,
            }}
            onClick={() => setSelected(p)}
          />
        ) : null
      )}

      {/* 📍 INFO WINDOW */}
      {selected && (
        <InfoWindow
          position={{
            lat: selected.lat,
            lng: selected.lng,
          }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ width: "220px" }}>
            <h3 style={{ margin: "5px 0" }}>
              {selected.title}
            </h3>

            <p style={{ margin: "5px 0" }}>
              💰 {selected.price}
            </p>

            {selected.image && (
              <img
                src={selected.image}
                alt="property"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}