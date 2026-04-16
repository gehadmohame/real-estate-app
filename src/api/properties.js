import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const propertiesRef = collection(db, "properties");

// ➕ Add Property (always pending)
export const addPropertyFB = async (property) => {
  try {
    const docRef = await addDoc(propertiesRef, {
      ...property,
      status: "pending", // 🔥 مهم جدًا للـ approval system
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.log("❌ Add Property Error:", error);
  }
};

// 📥 Get All Properties
export const getPropertiesFB = async () => {
  try {
    const snapshot = await getDocs(propertiesRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log("❌ Get Properties Error:", error);
    return [];
  }
};

// ✏️ Update Property (approve / reject / edit)
export const updatePropertyFB = async (id, data) => {
  try {
    const ref = doc(db, "properties", id);
    await updateDoc(ref, data);
  } catch (error) {
    console.log("❌ Update Error:", error);
  }
};

// ❌ Delete Property
export const deletePropertyFB = async (id) => {
  try {
    const ref = doc(db, "properties", id);
    await deleteDoc(ref);
  } catch (error) {
    console.log("❌ Delete Error:", error);
  }
};