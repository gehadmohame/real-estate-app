import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const favRef = collection(db, "favorites");

// ❤️ Add favorite
export const addFavoriteFB = async (property) => {
  await addDoc(favRef, property);
};

// 📥 Get favorites
export const getFavoritesFB = async () => {
  const snap = await getDocs(favRef);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

// ❌ Remove favorite (IMPORTANT FIX)
export const removeFavoriteFB = async (id) => {
  const ref = doc(db, "favorites", id);
  await deleteDoc(ref);
};