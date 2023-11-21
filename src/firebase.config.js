import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBiTJ38r3itlepMxJj1nAD3svd4MjBZq4I",
  authDomain: "adornspace-a8a9d.firebaseapp.com",
  projectId: "adornspace-a8a9d",
  storageBucket: "adornspace-a8a9d.appspot.com",
  messagingSenderId: "957607565796",
  appId: "1:957607565796:web:084e80808e4e9845670ff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 
export default app;
