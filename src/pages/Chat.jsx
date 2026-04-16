import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import {
  createChat,
  sendMessage,
  listenMessages,
  markSeen,
  setTyping,
} from "../api/chat";

export default function Chat() {
  const [searchParams] = useSearchParams();

  const propertyId = searchParams.get("propertyId");
  const userId = "buyer_1"; // مؤقت
  const sellerId = "seller_1";

  const chatId = `${propertyId}_${userId}_${sellerId}`;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTypingState] = useState(false);

  const endRef = useRef(null);

  // 🚨 حماية من crash
  if (!propertyId) {
    return (
      <div style={{ padding: 20 }}>
        <h3>❌ No chat selected</h3>
      </div>
    );
  }

  // 🟢 create chat
  useEffect(() => {
    createChat(chatId, {
      propertyId,
      users: [userId, sellerId],
    });
  }, [chatId]);

  // 💬 realtime messages
  useEffect(() => {
    const unsub = listenMessages(chatId, (msgs) => {
      setMessages(msgs);

      // 👁 mark seen
      msgs.forEach((m) => {
        if (!m.seenBy?.includes(userId)) {
          markSeen(chatId, m.id, userId);
        }
      });
    });

    return () => unsub();
  }, [chatId]);

  // 📤 send
  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage(chatId, {
      text,
      senderId: userId,
      senderRole: "user",
    });

    setText("");
    setTyping(chatId, false, userId);
  };

  // ⌨️ typing
  const handleTyping = (e) => {
    setText(e.target.value);

    if (!typing) {
      setTyping(chatId, true, userId);
      setTypingState(true);
    }

    setTimeout(() => {
      setTyping(chatId, false, userId);
      setTypingState(false);
    }, 1500);
  };

  // 🔥 auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2>💬 Chat</h2>

      {/* 💬 Messages */}
      <div style={styles.box}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              ...styles.msg,
              alignSelf:
                m.senderId === userId
                  ? "flex-end"
                  : "flex-start",
              background:
                m.senderId === userId ? "#ff385c" : "#eee",
              color:
                m.senderId === userId ? "#fff" : "#000",
            }}
          >
            {m.text}

            {/* 👁 seen */}
            {m.senderId === userId && (
              <small style={styles.seen}>
                {m.seenBy?.length > 1 ? "✓✓ Seen" : "✓ Sent"}
              </small>
            )}
          </div>
        ))}

        <div ref={endRef} />
      </div>

      {/* ⌨️ typing */}
      {typing && (
        <p style={{ fontSize: 12, color: "#888" }}>
          typing...
        </p>
      )}

      {/* 📤 Input */}
      <div style={styles.inputBox}>
        <input
          value={text}
          onChange={handleTyping}
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
    fontFamily: "Arial",
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

  seen: {
    display: "block",
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
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
    cursor: "pointer",
  },
};