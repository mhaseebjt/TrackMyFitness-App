import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcrxYFFBkaN4F399Q4b9KZDTFqEAJSbZg",
  authDomain: "trackmyfitness-backend.firebaseapp.com",
  projectId: "trackmyfitness-backend",
  storageBucket: "trackmyfitness-backend.firebasestorage.app",
  messagingSenderId: "838624918883",
  appId: "1:838624918883:web:773ede8df61512bfa6e756",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
