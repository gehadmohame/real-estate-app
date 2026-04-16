import { useEffect, useState, useRef } from "react";
import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  listenChats,
  listenMessages,
  sendMessage,
} from "../api/chat";

export default function AdminChat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  // 💬 LOAD CHATS (INBOX)
  useEffect(() => {
    const unsub = listenChats(setChats);
    return () => unsub();
  }, []);

  // 📩 LOAD MESSAGES
  useEffect(() => {
    if (!selectedChat) return;

    const unsub = listenMessages(selectedChat.id, setMessages);

    // 🔥 mark unread as false when opening chat
    updateDoc(doc(db, "chats", selectedChat.id), {
      unread_admin: false,
    });

    return () => unsub();
  }, [selectedChat]);

  // 📤 SEND MESSAGE
  const handleSend = async () => {
    if (!text.trim() || !selectedChat) return;

    await sendMessage(selectedChat.id, {
      text,
      senderId: "admin_1",
      senderRole: "admin",
    });

    setText("");
  };

  // 🔥 auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      {/* 🟢 LEFT - INBOX */}
      <div style={styles.sidebar}>
        <h3>💬 Inbox</h3>

        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            style={{
              ...styles.chatItem,
              background:
                selectedChat?.id === chat.id
                  ? "#f5f5f5"
                  : "#fff",
            }}
          >
            <p>
              <b>Property:</b> {chat.propertyId}
            </p>

            <p style={styles.lastMsg}>
              {chat.lastMessage || "No messages yet"}
            </p>

            {/* 🔴 unread badge */}
            {chat.unread_admin && (
              <span style={styles.badge}>New</span>
            )}

            {/* ⌨️ typing */}
            {chat.typing && (
              <small style={styles.typing}>
                typing...
              </small>
            )}
          </div>
        ))}
      </div>

      {/* 🔵 RIGHT - CHAT */}
      <div style={styles.chatBox}>
        {selectedChat ? (
          <>
            <h3>📩 Chat</h3>

            <div style={styles.messages}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    ...styles.msg,
                    alignSelf:
                      m.senderRole === "admin"
                        ? "flex-end"
                        : "flex-start",
                    background:
                      m.senderRole === "admin"
                        ? "#ff385c"
                        : "#eee",
                    color:
                      m.senderRole === "admin"
                        ? "#fff"
                        : "#000",
                  }}
                >
                  {m.text}

                  {/* 👁 seen */}
                  {m.seenBy?.length > 1 && (
                    <small style={styles.seen}>
                      ✓✓ seen
                    </small>
                  )}
                </div>
              ))}

              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div style={styles.inputBox}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type reply..."
                style={styles.input}
              />

              <button onClick={handleSend} style={styles.btn}>
                Send
              </button>
            </div>
          </>
        ) : (
          <h3>👈 Select a chat</h3>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    height: "90vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "30%",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
    padding: 10,
    background: "#fafafa",
  },

  chatItem: {
    padding: 10,
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
  },

  lastMsg: {
    fontSize: 12,
    color: "#666",
  },

  badge: {
    position: "absolute",
    right: 10,
    top: 10,
    background: "red",
    color: "#fff",
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: 10,
  },

  typing: {
    fontSize: 11,
    color: "#888",
    fontStyle: "italic",
  },

  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 10,
  },

  msg: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "60%",
  },

  seen: {
    fontSize: 10,
    display: "block",
    marginTop: 4,
    opacity: 0.7,
  },

  inputBox: {
    display: "flex",
    gap: 10,
    marginTop: 10,
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