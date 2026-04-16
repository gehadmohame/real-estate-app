import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const reqRef = collection(db, "requests");

// ➕ Add request
export const addRequestFB = async (data) => {
  await addDoc(reqRef, data);
};

// 📥 Get all requests
export const getRequestsFB = async () => {
  const snap = await getDocs(reqRef);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// ❌ Delete request (للأدمن)
export const deleteRequestFB = async (id) => {
  const ref = doc(db, "requests", id);
  await deleteDoc(ref);
};