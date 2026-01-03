/* =========================================================
   FIREBASE CORE CONFIG & AUTH UTILITIES (REFINED)
========================================================= */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* --------------------------
   FIREBASE CONFIG
-------------------------- */
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID"
};

/* --------------------------
   INITIALIZE FIREBASE
-------------------------- */
const app = initializeApp(firebaseConfig);

/* --------------------------
   EXPORT CORE SERVICES
-------------------------- */
export const auth = getAuth(app);
export const db = getFirestore(app);

/* --------------------------
   AUTH HELPERS (PRESERVED)
-------------------------- */
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/* --------------------------
   OPTIONAL AUTH GUARD
   (USE ONLY ON PROTECTED PAGES)
-------------------------- */
export function requireAuth(redirectTo = "login.html") {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = redirectTo;
    }
  });
}