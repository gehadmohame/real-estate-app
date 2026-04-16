import { useState } from "react";
import Map from "../components/Map";
import { addPropertyFB } from "../api/properties";

export default function Sell() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [location, setLocation] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("من فضلك املأ البيانات ❌");
      return;
    }

    try {
      await addPropertyFB({
        title: form.title,
        price: form.price,
        image:
          form.image ||
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        status: "pending",

        // 🗺️ location from map
        lat: location.lat,
        lng: location.lng,
      });

      alert("تم إضافة العقار بنجاح ✅");

      setForm({
        title: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      alert("حصل خطأ ❌");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>🏠 Sell Your Property</h1>

      {/* 📝 Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* 🗺️ MAP */}
        <Map
          lat={location.lat}
          lng={location.lng}
          onSelect={(pos) => setLocation(pos)}
        />

        <p>
          📍 Lat: {location.lat} <br />
          📍 Lng: {location.lng}
        </p>

        <button style={btnStyle} type="submit">
          Submit Property
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btnStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "white",
  cursor: "pointer",
};