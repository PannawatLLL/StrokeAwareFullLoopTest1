import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxEsH9SW2g3lK5ZCckOWn0ZYi2SzDVGLQ",
  authDomain: "strokeaware-ff8c5.firebaseapp.com",
  projectId: "strokeaware-ff8c5",
  storageBucket: "strokeaware-ff8c5.firebasestorage.app",
  messagingSenderId: "33287097753",
  appId: "1:33287097753:web:05951a37e7469a2183d708",
  measurementId: "G-QJ08L3V38S"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);