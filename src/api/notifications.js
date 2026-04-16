import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";

const notificationsRef = collection(db, "notifications");

// 🔔 Create notification
export const createNotification = async (data) => {
  try {
    await addDoc(notificationsRef, {
      ...data,
      seen: false,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("Notification Error:", error);
  }
};

// 📥 Listen to user notifications
export const listenNotifications = (userId, callback) => {
  const q = query(
    notificationsRef,
    where("to", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};

// ✔ mark as read
export const markAsSeen = async (id) => {
  await updateDoc(doc(db, "notifications", id), {
    seen: true,
  });
};