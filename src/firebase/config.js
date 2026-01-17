import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDV4wmDitqiVOeqS6Oh1ktMygmYqD-5-hY",
    authDomain: "mindconnect-f122b.firebaseapp.com",
    projectId: "mindconnect-f122b",
    storageBucket: "mindconnect-f122b.firebasestorage.app",
    messagingSenderId: "465037924947",
    appId: "1:465037924947:web:e6811dc3fb813ead7cc4a6",
    measurementId: "G-GYL3BH7DR1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (our database)
export const db = getFirestore(app);