import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe8VPZrIU1Mr7i0KgZr2vrQFenUpVRkvk",
  authDomain: "signal-clone-build-964e9.firebaseapp.com",
  projectId: "signal-clone-build-964e9",
  storageBucket: "signal-clone-build-964e9.appspot.com",
  messagingSenderId: "1039583043078",
  appId: "1:1039583043078:web:6e8305ff72fef511092d87",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const FIREBASE_AUTH = getAuth(app);

export { app, db, FIREBASE_AUTH };
