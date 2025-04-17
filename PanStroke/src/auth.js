import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1ZtIB-aZKWthJmqnRTU1xQBh0i70pvIQ",
  authDomain: "stroke-aware.firebaseapp.com",
  projectId: "stroke-aware",
  storageBucket: "stroke-aware.firebasestorage.app",
  messagingSenderId: "765442419896",
  appId: "1:765442419896:web:0fe6cdde805396ad1ed84d",
  measurementId: "G-KZ2PCBL9G3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);