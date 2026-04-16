import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYCX2QSWTHnZrpH8G2CSLr8tyNQThKdLk",
  authDomain: "real-estate-app-2-32ff1.firebaseapp.com",
  projectId: "real-estate-app-2-32ff1",
  storageBucket: "real-estate-app-2-32ff1.firebasestorage.app",
  messagingSenderId: "122941294779",
  appId: "1:122941294779:web:f7319004426c084656019e",
};

const app = initializeApp(firebaseConfig);

// 🔥 لازم يكون export باسم db بالظبط
export const db = getFirestore(app);