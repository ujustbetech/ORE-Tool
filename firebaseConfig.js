
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBJR8vMnR8itCm1NV9utdUUXziG0S9eG0",
  authDomain: "oretool.firebaseapp.com",
  projectId: "oretool",
  storageBucket: "oretool.firebasestorage.app",
  messagingSenderId: "381422917631",
  appId: "1:381422917631:web:d01e229a92b4e7004679ca",
  measurementId: "G-735HE4D624"
};

// Check if Firebase is already initialized
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
