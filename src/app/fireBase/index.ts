// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(JSON.stringify(import.meta.env.APP_API_KEY));
console.log(import.meta.env.VITE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

//init firebase app
const app = initializeApp(firebaseConfig);

//init services
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  storage,
  db,
  googleProvider,
  doc,
  setDoc,
  query,
  getDocs,
  collection,
  where,
  getDoc,
  addDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
