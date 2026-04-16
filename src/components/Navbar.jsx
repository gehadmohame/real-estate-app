import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaHome,
  FaPlusCircle,
  FaUser,
  FaComments,
} from "react-icons/fa";

export default function Navbar() {
  const [search, setSearch] = useState("");

  // 🔥 هنا ممكن نحط default propertyId أو نسيبه فاضي
  const defaultPropertyId = "test_property";

  return (
    <nav style={styles.nav}>
      {/* 🏡 Logo */}
      <Link to="/" style={styles.logo}>
        <FaHome size={20} /> StayFinder
      </Link>

      {/* 🔍 Search */}
      <div style={styles.searchBox}>
        <FaSearch style={{ marginRight: "8px", color: "#999" }} />
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* 📍 Icons */}
      <div style={styles.icons}>
        <Link to="/" style={styles.iconBtn} title="Home">
          <FaHome />
        </Link>

        <Link to="/buy" style={styles.iconBtn} title="Buy">
          🏠
        </Link>

        <Link to="/sell" style={styles.iconBtn} title="Sell">
          <FaPlusCircle />
        </Link>

        <Link to="/favorites" style={styles.iconBtn} title="Favorites">
          <FaHeart />
        </Link>

        {/* 💬 CHAT (REAL LINK) */}
        <Link
          to={`/chat?propertyId=${defaultPropertyId}`}
          style={styles.iconBtn}
          title="Chat"
        >
          <FaComments />
        </Link>

        <Link to="/admin" style={styles.iconBtn} title="Profile">
          <FaUser />
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 1000,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#ff385c",
  },

  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    margin: "0 20px",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "30px",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
  },

  icons: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    fontSize: "18px",
  },

  iconBtn: {
    textDecoration: "none",
    color: "#333",
    padding: "8px",
    borderRadius: "50%",
    transition: "0.2s",
  },
};