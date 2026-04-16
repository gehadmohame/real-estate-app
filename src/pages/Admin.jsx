import { useEffect, useState } from "react";
import {
  getPropertiesFB,
  approvePropertyFB,
  deletePropertyFB,
} from "../api/properties";

export default function Admin() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getPropertiesFB();
    setProperties(data);
  };

  const pending = properties.filter((p) => p.status === "pending");
  const approved = properties.filter((p) => p.status === "approved");

  return (
    <div style={{ padding: 20 }}>
      <h1>🔐 Admin Dashboard</h1>

      {/* 📊 STATS */}
      <div style={styles.stats}>
        <div>Total: {properties.length}</div>
        <div>Pending: {pending.length}</div>
        <div>Approved: {approved.length}</div>
      </div>

      {/* ⏳ PENDING */}
      <h2>⏳ Pending Requests</h2>

      {pending.map((p) => (
        <div key={p.id} style={styles.card}>
          <img src={p.image} style={styles.img} />

          <div style={{ flex: 1 }}>
            <h3>{p.title}</h3>
            <p>💰 {p.price}</p>
            <p>📍 {p.city}</p>

            <button
              onClick={() => approvePropertyFB(p.id).then(load)}
              style={styles.approve}
            >
              Approve
            </button>

            <button
              onClick={() => deletePropertyFB(p.id).then(load)}
              style={styles.delete}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ✅ APPROVED */}
      <h2>✅ Approved</h2>

      {approved.map((p) => (
        <div key={p.id} style={styles.card}>
          <img src={p.image} style={styles.img} />
          <div>
            <h3>{p.title}</h3>
            <p>Approved ✔</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  stats: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
  },

  card: {
    display: "flex",
    gap: 15,
    padding: 10,
    border: "1px solid #eee",
    marginBottom: 10,
    borderRadius: 10,
  },

  img: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 10,
  },

  approve: {
    background: "green",
    color: "#fff",
    padding: 5,
    marginRight: 10,
  },

  delete: {
    background: "red",
    color: "#fff",
    padding: 5,
  },
};