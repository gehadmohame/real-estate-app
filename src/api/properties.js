// Firebase Firestore imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";

// Firebase config (حطي بيانات مشروعك هنا)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🟢 Reference to collection
const propertiesCollection = collection(db, "properties");

// 🟢 Get all properties
export const getProperties = async () => {
  try {
    const snapshot = await getDocs(propertiesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

// 🟢 Get single property by id
export const getPropertyById = async (id) => {
  try {
    const docRef = doc(db, "properties", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};

// 🟢 Add new property
export const addProperty = async (data) => {
  try {
    const docRef = await addDoc(propertiesCollection, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding property:", error);
    return null;
  }
};