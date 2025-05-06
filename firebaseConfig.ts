// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAflOp4Z1DTNA9qYVwEiLeQb72p787HH3s",
  authDomain: "fbclone-f9186.firebaseapp.com",
  databaseURL: "https://fbclone-f9186-default-rtdb.firebaseio.com",
  projectId: "fbclone-f9186",
  storageBucket: "fbclone-f9186.firebasestorage.app",
  messagingSenderId: "43317436789",
  appId: "1:43317436789:web:019600f5714fe2a75cb33c",
  measurementId: "G-LCZETJVM3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
