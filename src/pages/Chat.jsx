import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { sendMessage, listenMessages } from "../api/chat";

export default function Chat() {
  const [searchParams] = useSearchParams();

  const propertyId = searchParams.get("propertyId") || "test_property";

  const userId = "buyer_1";
  const sellerId = "seller_1";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔥 realtime chat
  useEffect(() => {
    const unsub = listenMessages(propertyId, setMessages);
    return () => unsub();
  }, [propertyId]);

  // 📤 send message
  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      propertyId,
      senderId: userId,
      receiverId: sellerId,
      text,
    });

    setText("");
  };

  return (
    <div style={styles.container}>
      <h2>💬 Chat</h2>

      <div style={styles.box}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              ...styles.msg,
              alignSelf:
                m.senderId === userId ? "flex-end" : "flex-start",
              background:
                m.senderId === userId ? "#ff385c" : "#eee",
              color: m.senderId === userId ? "#fff" : "#000",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
        />

        <button onClick={handleSend} style={styles.btn}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  box: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 10,
  },

  msg: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "60%",
  },

  inputBox: {
    display: "flex",
    marginTop: 10,
    gap: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  btn: {
    background: "#ff385c",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: 8,
  },
};