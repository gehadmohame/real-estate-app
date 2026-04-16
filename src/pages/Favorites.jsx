import { useEffect, useState } from "react";
import {
  getFavoritesFB,
  removeFavoriteFB,
} from "../api/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // 📥 Load favorites
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavoritesFB();
      setFavorites(data);
    };

    fetchData();
  }, []);

  // ❌ Remove favorite
  const handleRemove = async (id) => {
    await removeFavoriteFB(id);

    setFavorites((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div style={styles.container}>
      <h1>❤️ My Wishlist</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet 💔</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} style={styles.img} />

              <h3>{item.title}</h3>
              <p>💰 {item.price}</p>

              <button
                onClick={() => handleRemove(item.id)}
                style={styles.btn}
              >
                ❌ Remove
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
    padding: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  img: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "red",
    color: "white",
    cursor: "pointer",
  },
};