// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuIjJEh-XpdpbQ7NilPJ8VIcGrpqpWCNc",
  authDomain: "roaryrewards.firebaseapp.com",
  projectId: "roaryrewards",
  storageBucket: "roaryrewards.firebasestorage.app",
  messagingSenderId: "494921395583",
  appId: "1:494921395583:web:ec498b7146c8fbcf08fe4a",
  measurementId: "G-C42H8N5MWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);