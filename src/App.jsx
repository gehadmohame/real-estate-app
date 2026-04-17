import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Admin from "./pages/Admin";
import PropertyDetails from "./pages/PropertyDetails";
import Request from "./pages/Request";
import Chat from "./pages/Chat";

import Navbar from "./components/Navbar";

import { getPropertiesFB } from "./api/properties";

export default function App() {
  const [properties, setProperties] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  // 🔥 Load properties from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPropertiesFB();
        setProperties(data);
      } catch (err) {
        console.log("Firebase error:", err);
      }
    };

    fetchData();
  }, []);

  // 💾 Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 💾 Save admin state
  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  // ⭐ toggle favorite
  const toggleFavorite = (property) => {
    const exists = favorites.find((f) => f.id === property.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={<Home properties={properties} />}
        />

        {/* 🏡 Buy (approved only inside page) */}
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

        {/* 🏗 Sell */}
        <Route path="/sell" element={<Sell />} />

        {/* 📄 Property Details */}
        <Route
          path="/property/:id"
          element={<PropertyDetails properties={properties} />}
        />

        {/* 📩 Request */}
        <Route path="/request" element={<Request />} />

        {/* 💬 Chat (REAL FIXED ROUTE) */}
        <Route path="/chat" element={<Chat />} />

        {/* 🔐 Admin */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Admin setIsAdmin={setIsAdmin} />
            ) : (
              <LoginAdmin setIsAdmin={setIsAdmin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

// 🔐 Login Admin
function LoginAdmin({ setIsAdmin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "1234") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
    } else {
      alert("Wrong password ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🔐 Admin Login</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px" }}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
