// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDzXUTyIG3FN4YcCTBReAHexO50OU0lAs",
  authDomain: "rental-a34ca.firebaseapp.com",
  projectId: "rental-a34ca",
  storageBucket: "rental-a34ca.appspot.com",
  messagingSenderId: "354052792499",
  appId: "1:354052792499:web:d1613bac2a5e1a1bb3d0c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
