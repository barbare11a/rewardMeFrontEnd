// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "roaryrewards.firebaseapp.com",
  projectId: "roaryrewards",
  storageBucket: "roaryrewards.firebasestorage.app",
  messagingSenderId: "494921395583",
  appId: "1:494921395583:web:ec498b7146c8fbcf08fe4a",
  measurementId: "G-C42H8N5MWT",
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics (optional, if you're using it)
// const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Firebase Auth and Firestore
const auth = getAuth(app); // Export Auth
const firestore = getFirestore(app);

// Export initialized Firebase services
export { app, auth, firestore };
