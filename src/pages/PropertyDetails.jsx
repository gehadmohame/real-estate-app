import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

export default function PropertyDetails({
  properties = [],
  toggleFavorite,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  // 🔥 FIND PROPERTY (FIXED)
  const property = useMemo(() => {
    return properties.find((p) => p.id === id);
  }, [id, properties]);

  // 🗺 Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries: ["places"],
  });

  // ❌ SAFE CHECK (مهم جدًا)
  if (!property) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>❌ Property not found</h2>
        <p>Check Firebase data or ID routing</p>
      </div>
    );
  }

  const images = property.images?.length
    ? property.images
    : [property.image];

  const next = () =>
    setIndex((i) => (i < images.length - 1 ? i + 1 : i));

  const prev = () =>
    setIndex((i) => (i > 0 ? i - 1 : i));

  const center = {
    lat: property.lat || 30.0444,
    lng: property.lng || 31.2357,
  };

  return (
    <div style={styles.container}>
      {/* 🖼 IMAGE */}
      <div style={styles.imageBox}>
        <img src={images[index]} style={styles.image} />

        <div style={styles.sliderBtns}>
          <button onClick={prev}>⬅</button>
          <button onClick={next}>➡</button>
        </div>
      </div>

      {/* 📄 INFO */}
      <div style={styles.info}>
        <h1>{property.title}</h1>
        <h2>💰 {property.price}</h2>
        <p>📍 {property.city}</p>

        {/* ❤️ FAVORITE */}
        <button
          onClick={() => toggleFavorite(property)}
          style={styles.btn}
        >
          ❤️ Add to Wishlist
        </button>

        {/* 🏡 BOOK */}
        <button
          onClick={() =>
            navigate("/request", { state: { property } })
          }
          style={styles.bookBtn}
        >
          🏡 Book Now
        </button>

        {/* 💬 WHATSAPP */}
        <a
          href={`https://wa.me/201141001949?text=I want this property: ${property.title}`}
          target="_blank"
          rel="noreferrer"
          style={styles.chatBtn}
        >
          💬 Chat on WhatsApp
        </a>

        {/* 🗺 MAP */}
        <div style={{ marginTop: "20px" }}>
          {!isLoaded ? (
            <p>Loading map...</p>
          ) : (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "250px",
                borderRadius: "12px",
              }}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    flexWrap: "wrap",
  },

  imageBox: {
    flex: 1,
    minWidth: "300px",
  },

  image: {
    width: "100%",
    borderRadius: "12px",
  },

  sliderBtns: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  info: {
    flex: 1,
    minWidth: "300px",
  },

  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    width: "100%",
  },

  bookBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    fontWeight: "bold",
  },

  chatBtn: {
    display: "block",
    marginTop: "10px",
    padding: "12px",
    background: "#25D366",
    color: "#fff",
    textAlign: "center",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};