import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

// 🏡 Pages
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import PropertyDetails from "./pages/PropertyDetails";

// 🧑‍💼 Admin
import AdminProperties from "./pages/AdminProperties";
import AdminChat from "./pages/AdminChat";

// 📡 API
import { getPropertiesFB } from "./api/properties";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 Load properties safely (🔥 مهم جدًا)
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertiesFB();
        setProperties(data || []);
      } catch (err) {
        console.error("🔥 Firebase Error:", err);
        setProperties([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ❤️ Toggle Favorite
  const toggleFavorite = (property) => {
    const exists = favorites.find((f) => f.id === property.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  // ⏳ Loading UI (🔥 يمنع white screen)
  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🏡 Public */}
        <Route path="/" element={<Home properties={properties} />} />

        <Route
          path="/buy"
          element={
            <Buy
              properties={properties}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route path="/sell" element={<Sell />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route
          path="/property/:id"
          element={<PropertyDetails properties={properties} />}
        />

        {/* 🧑‍💼 Admin */}
        <Route path="/admin" element={<AdminProperties />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/chat" element={<AdminChat />} />

        {/* 🚨 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: 20 }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}