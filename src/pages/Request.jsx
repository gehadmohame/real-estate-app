import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addRequestFB } from "../api/requests";

export default function Request() {
  const { state } = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRequestFB({
      ...form,
      property: state?.property || null,
      createdAt: new Date(),
    });

    alert("✅ Request sent!");

    setForm({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div style={styles.container}>
      <h2>🏡 Book this property</h2>

      {state?.property && (
        <div style={styles.card}>
          <img src={state.property.image} style={styles.img} />
          <h3>{state.property.title}</h3>
          <p>💰 {state.property.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={styles.input}
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          style={styles.input}
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          style={styles.textarea}
        />

        <button style={styles.btn}>Send Request</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
  },

  card: {
    marginBottom: "20px",
    textAlign: "center",
  },

  img: {
    width: "100%",
    borderRadius: "10px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  btn: {
    padding: "12px",
    background: "#ff385c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};