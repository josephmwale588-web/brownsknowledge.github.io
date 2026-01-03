/* =========================================================
   TEACHER / AUTHOR SIGNUP (REFINED & SAFE)
========================================================= */

import { auth, db } from './auth.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const teacherForm = document.getElementById('teacherSignup');

if (teacherForm) {
  teacherForm.addEventListener('submit', async e => {
    e.preventDefault();

    try {
      /* Get input values safely */
      const emailInput = teacherForm.querySelector('input[name="email"]');
      const passwordInput = teacherForm.querySelector('input[name="password"]');
      const nameInput = teacherForm.querySelector('input[name="name"]');

      const email = emailInput?.value.trim();
      const password = passwordInput?.value;
      const fullName = nameInput?.value.trim();

      if (!email || !password || !fullName) {
        alert("Please fill in all required fields.");
        return;
      }

      /* Create auth account */
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      /* Store teacher profile (pending approval) */
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: fullName,
        email: email,
        role: "teacher",
        approved: false,
        createdAt: serverTimestamp()
      });

      alert("Application submitted successfully. Await admin approval.");
      teacherForm.reset();

    } catch (error) {
      console.error("Teacher signup error:", error);

      let message = "Signup failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        message = "Password must be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      alert(message);
    }
  });
}