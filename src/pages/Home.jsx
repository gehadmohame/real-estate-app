import { useState, useMemo } from "react";
import PropertiesMap from "../components/PropertiesMap";

export default function Home({ properties = [] }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [city, setCity] = useState("");

  // 🔥 FILTERED PROPERTIES (approved only + filters)
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => p.status === "approved")
      .filter((p) => {
        const matchSearch =
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.city?.toLowerCase().includes(search.toLowerCase());

        const matchPrice =
          maxPrice === "" || Number(p.price || 0) <= Number(maxPrice);

        const matchCity =
          city === "" ||
          p.city?.toLowerCase().includes(city.toLowerCase());

        return matchSearch && matchPrice && matchCity;
      });
  }, [properties, search, maxPrice, city]);

  return (
    <div style={styles.container}>
      {/* 🏡 SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏡 Properties</h2>

        {/* 🔍 SEARCH */}
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* 💰 PRICE */}
        <input
          placeholder="Max price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />

        {/* 🏙 CITY */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        >
          <option value="">All Cities</option>
          <option value="cairo">Cairo</option>
          <option value="hurghada">Hurghada</option>
          <option value="alex">Alex</option>
        </select>

        {/* 📍 LIST */}
        {filteredProperties.length === 0 ? (
          <p style={{ marginTop: 20 }}>No approved properties</p>
        ) : (
          filteredProperties.map((p) => (
            <div
              key={p.id}
              style={{
                ...styles.card,
                border:
                  selectedProperty?.id === p.id
                    ? "2px solid #ff385c"
                    : "1px solid #eee",
              }}
              onClick={() => setSelectedProperty(p)}
            >
              <img src={p.image} style={styles.img} />

              <div>
                <h4>{p.title}</h4>
                <p>💰 {p.price}</p>
                <small>📍 {p.city}</small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🗺 MAP */}
      <div style={styles.map}>
        <PropertiesMap
          properties={filteredProperties}
          selectedProperty={selectedProperty}
        />
      </div>
    </div>
  );
}

// 🎨 styles (FIXED)
const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 70px)",
  },

  sidebar: {
    width: "35%",
    overflowY: "auto",
    padding: "15px",
    borderRight: "1px solid #eee", // ✅ FIXED HERE
  },

  map: {
    width: "65%",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  card: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  img: {
    width: "70px",
    height: "70px",
    borderRadius: "10px",
    objectFit: "cover",
  },
};