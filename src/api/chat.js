import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";


// 💬 CREATE CHAT
export const createChat = async (chatId, data) => {
  await setDoc(doc(db, "chats", chatId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),

    lastMessage: "",
    unread_admin: false,
    typing: false,
  });
};


// 📤 SEND MESSAGE
export const sendMessage = async (chatId, message) => {
  const msgRef = collection(db, "chats", chatId, "messages");

  await addDoc(msgRef, {
    ...message,
    createdAt: serverTimestamp(),

    // 👀 seen system
    seenBy: [message.senderId],
  });

  // 🔥 update chat preview (WhatsApp inbox style)
  await updateDoc(doc(db, "chats", chatId), {
    lastMessage: message.text,
    updatedAt: serverTimestamp(),

    // 🔴 notify admin new message
    unread_admin: true,
  });
};


// 👁 MARK MESSAGE AS SEEN
export const markSeen = async (chatId, messageId, userId) => {
  const ref = doc(db, "chats", chatId, "messages", messageId);

  await updateDoc(ref, {
    seenBy: arrayUnion(userId),
  });
};


// 🔥 REALTIME MESSAGES LISTENER
export const listenMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
};


// 💬 REALTIME CHAT LISTENER (Inbox)
export const listenChats = (callback) => {
  const q = query(
    collection(db, "chats"),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(chats);
  });
};


// ⌨️ TYPING STATUS
export const setTyping = async (chatId, isTyping, userId) => {
  await updateDoc(doc(db, "chats", chatId), {
    typing: isTyping ? userId : false,
  });
};