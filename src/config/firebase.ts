// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBga6T8FJL6UQZD_ERWPfJAqs_v7llbhxk",
  authDomain: "sahyog-2c25f.firebaseapp.com",
  projectId: "sahyog-2c25f",
  storageBucket: "sahyog-2c25f.firebasestorage.app",
  messagingSenderId: "66260401984",
  appId: "1:66260401984:web:ef4ca22ae064eda43284a5",
  measurementId: "G-F3Y1V60RBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, db, storage, auth };
