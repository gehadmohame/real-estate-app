import { Link } from "react-router-dom";

export default function Buy({
  properties = [],
  favorites = [],
  toggleFavorite,
}) {
  // 🔥 approved only + safety
  const approvedProperties = (properties || []).filter(
    (p) => p?.status === "approved"
  );

  return (
    <div style={styles.container}>
      <h2>🏠 Buy Properties</h2>

      {approvedProperties.length === 0 ? (
        <p>No available properties yet</p>
      ) : (
        <div style={styles.grid}>
          {approvedProperties.map((p) => (
            <div key={p.id} style={styles.card}>
              <Link
                to={`/property/${p.id}`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  style={styles.img}
                  alt="property"
                />

                <h3>{p.title}</h3>
                <p>💰 {p.price}</p>
                <p>📍 {p.city}</p>
              </Link>

              {/* ❤️ Favorite */}
              <button
                onClick={() => toggleFavorite && toggleFavorite(p)}
                style={{
                  ...styles.favBtn,
                  background: favorites.find((f) => f.id === p.id)
                    ? "red"
                    : "#eee",
                  color: favorites.find((f) => f.id === p.id)
                    ? "#fff"
                    : "#000",
                }}
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "10px",
    position: "relative",
  },

  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  favBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
  },
};