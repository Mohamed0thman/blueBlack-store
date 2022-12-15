// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc
  , 
  
} from "firebase/firestore";

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
const firebaseConfig = {
  apiKey: "AIzaSyDt0V19Ns6ebQ3Jlz0Yyv5VMEy7E-Dlwbg",
  authDomain: "blueblack-59ff2.firebaseapp.com",
  projectId: "blueblack-59ff2",
  storageBucket: "blueblack-59ff2.appspot.com",
  messagingSenderId: "911789604149",
  appId: "1:911789604149:web:176c3fb2da59b8564a607c",
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
  getDoc,addDoc
};
