import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { createNotification } from "../api/notifications";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);

  // 📥 realtime load
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "properties"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setProperties(data);
    });

    return () => unsub();
  }, []);

  // ✅ APPROVE
  const approveProperty = async (id) => {
    await updateDoc(doc(db, "properties", id), {
      status: "approved",
    });

    await createNotification({
      to: "buyer_1",
      message: "🎉 Your property was approved!",
    });
  };

  // ❌ REJECT
  const rejectProperty = async (id) => {
    await updateDoc(doc(db, "properties", id), {
      status: "rejected",
    });

    await createNotification({
      to: "buyer_1",
      message: "❌ Your property was rejected",
    });
  };

  // 🗑 DELETE
  const deleteProperty = async (id) => {
    await deleteDoc(doc(db, "properties", id));
  };

  return (
    <div style={styles.container}>
      <h2>🧑‍💼 Admin Properties</h2>

      {properties.map((p) => (
        <div key={p.id} style={styles.card}>
          <h3>{p.title}</h3>
          <p>💰 {p.price}</p>
          <p>📍 {p.city}</p>

          <p>
            Status:{" "}
            <b
              style={{
                color:
                  p.status === "approved"
                    ? "green"
                    : p.status === "rejected"
                    ? "red"
                    : "orange",
              }}
            >
              {p.status}
            </b>
          </p>

          <div style={styles.actions}>
            <button
              onClick={() => approveProperty(p.id)}
              style={styles.approve}
            >
              ✅ Approve
            </button>

            <button
              onClick={() => rejectProperty(p.id)}
              style={styles.reject}
            >
              ❌ Reject
            </button>

            <button
              onClick={() => deleteProperty(p.id)}
              style={styles.delete}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 🎨 styles
const styles = {
  container: {
    padding: 20,
  },

  card: {
    border: "1px solid #ddd",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    background: "#fff",
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  approve: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  reject: {
    background: "orange",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  delete: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};