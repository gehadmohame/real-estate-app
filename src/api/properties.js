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

// 📌 Reference
const propertiesRef = collection(db, "properties");

// ➕ Add Property (default = pending)
export const addPropertyFB = async (property) => {
  try {
    const docRef = await addDoc(propertiesRef, {
      ...property,
      status: "pending", // 🔥 مهم
      createdAt: serverTimestamp(),
    });

    console.log("✅ Property added:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log("❌ Add Error:", error);
  }
};

// 📥 Get All
export const getPropertiesFB = async () => {
  try {
    const snapshot = await getDocs(propertiesRef);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("🔥 Loaded:", data);

    return data;
  } catch (error) {
    console.log("❌ Get Error:", error);
    return [];
  }
};

// ✅ Approve Property (ADMIN)
export const approvePropertyFB = async (id) => {
  try {
    const ref = doc(db, "properties", id);

    await updateDoc(ref, {
      status: "approved",
    });

    console.log("✅ Approved:", id);
  } catch (error) {
    console.log("❌ Approve Error:", error);
  }
};

// ✏️ Update
export const updatePropertyFB = async (id, data) => {
  try {
    const ref = doc(db, "properties", id);
    await updateDoc(ref, data);
  } catch (error) {
    console.log("❌ Update Error:", error);
  }
};

// ❌ Delete
export const deletePropertyFB = async (id) => {
  try {
    const ref = doc(db, "properties", id);
    await deleteDoc(ref);
  } catch (error) {
    console.log("❌ Delete Error:", error);
  }
};