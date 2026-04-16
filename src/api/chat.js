import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const chatRef = collection(db, "chats");

// 💬 SEND MESSAGE (STANDARD NAME)
export const sendMessage = async (data) => {
  return await addDoc(chatRef, {
    ...data,
    createdAt: serverTimestamp(),
    seen: false,
  });
};

// 🔥 REALTIME CHAT
export const listenMessages = (propertyId, callback) => {
  const q = query(
    chatRef,
    where("propertyId", "==", propertyId),
    orderBy("createdAt")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
};