import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdExNL77nWt5ZTdAEu58qp7nJmhNLHXvk",
    authDomain: "product-dd32c.firebaseapp.com",
    projectId: "product-dd32c",
    storageBucket: "product-dd32c.firebasestorage.app",
    messagingSenderId: "839264578537",
    appId: "1:839264578537:web:f48556ce2b385361d3f978"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();