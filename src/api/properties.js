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
  apiKey: "AIzaSyCXKLQTNeSQYBFARxwQlBF2eQsDbLge8To",
  authDomain: "real-estate-app-791ec.firebaseapp.com",
  projectId: "real-estate-app-791ec",
  storageBucket: "real-estate-app-791ec.firebasestorage.app",
  messagingSenderId: "694930793597",
  appId: "1:694930793597:web:37e7730a245bbdb2e57d14",
  measurementId: "G-ZJZRS7D5G8"
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