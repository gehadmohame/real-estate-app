import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// 📤 Send message
export const sendMessage = async ({
  propertyId,
  senderId,
  receiverId,
  text,
}) => {
  try {
    const ref = collection(db, "chats", propertyId, "messages");

    await addDoc(ref, {
      text,
      senderId,
      receiverId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log("❌ Send Error:", error);
  }
};

// 🔥 Listen realtime
export const listenMessages = (propertyId, callback) => {
  const ref = collection(db, "chats", propertyId, "messages");

  const q = query(ref, orderBy("createdAt", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });

  return unsubscribe;
};