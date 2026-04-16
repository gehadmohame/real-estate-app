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


// ➕ ADD PROPERTY (PENDING BY DEFAULT)
export const addPropertyFB = async (property) => {
  try {
    const docRef = await addDoc(propertiesRef, {
      ...property,
      status: "pending", // 🔥 مهم جدًا
      createdAt: serverTimestamp(),
    });

    console.log("Property added (pending):", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log("Add Error:", error);
  }
};


// 📥 GET ALL
export const getPropertiesFB = async () => {
  try {
    const snapshot = await getDocs(propertiesRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log("Get Error:", error);
    return [];
  }
};


// ✏️ APPROVE PROPERTY (ADMIN ONLY)
export const approvePropertyFB = async (id) => {
  try {
    const ref = doc(db, "properties", id);

    await updateDoc(ref, {
      status: "approved",
    });

    console.log("Approved:", id);
  } catch (error) {
    console.log("Approve Error:", error);
  }
};


// ❌ DELETE
export const deletePropertyFB = async (id) => {
  try {
    await deleteDoc(doc(db, "properties", id));
  } catch (error) {
    console.log("Delete Error:", error);
  }
};