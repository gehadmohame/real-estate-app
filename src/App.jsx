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

  // 📥 Load properties from Firebase
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPropertiesFB();
        setProperties(data || []);
      } catch (err) {
        console.log("Error loading properties:", err);
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

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🏡 Home */}
        <Route path="/" element={<Home properties={properties} />} />

        {/* 🏡 Buy */}
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

        {/* 🏡 Sell */}
        <Route path="/sell" element={<Sell />} />

        {/* 💬 Chat */}
        <Route path="/chat" element={<Chat />} />

        {/* ❤️ Favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* 🏠 Property Details */}
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