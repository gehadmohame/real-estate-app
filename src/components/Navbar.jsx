import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaPlusCircle,
  FaHeart,
  FaComments,
  FaBell,
  FaUser,
} from "react-icons/fa";

import { listenNotifications } from "../api/notifications";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);

  const userId = "buyer_1"; // 🔥 لاحقًا من auth

  // 🔔 realtime notifications
  useEffect(() => {
    const unsub = listenNotifications(userId, setNotifications);
    return () => unsub();
  }, []);

  const unreadCount = notifications.filter((n) => !n.seen).length;

  return (
    <nav style={styles.nav}>
      {/* 🏡 Logo */}
      <Link to="/" style={styles.logo}>
        🏡 StayFinder
      </Link>

      {/* 📍 Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.icon}>
          <FaHome />
        </Link>

        <Link to="/buy" style={styles.icon}>
          🏠
        </Link>

        <Link to="/sell" style={styles.icon}>
          <FaPlusCircle />
        </Link>

        <Link to="/favorites" style={styles.icon}>
          <FaHeart />
        </Link>

        <Link to="/chat" style={styles.icon}>
          <FaComments />
        </Link>

        {/* 🔔 Notifications */}
        <div style={styles.bell}>
          <FaBell size={18} />

          {unreadCount > 0 && (
            <span style={styles.badge}>{unreadCount}</span>
          )}
        </div>

        <Link to="/admin" style={styles.icon}>
          <FaUser />
        </Link>
      </div>
    </nav>
  );
}

// 🎨 styles
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 1000,
  },

  logo: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 18,
    color: "#ff385c",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    fontSize: 18,
  },

  icon: {
    textDecoration: "none",
    color: "#333",
  },

  bell: {
    position: "relative",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    background: "red",
    color: "#fff",
    fontSize: 10,
    borderRadius: "50%",
    padding: "2px 5px",
  },
};