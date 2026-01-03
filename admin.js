/* =========================================================
   ADMIN PREMIUM CONTENT REGISTRATION
========================================================= */

import { db } from './auth.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const uploadBtn = document.getElementById('uploadBtn');
if (!uploadBtn) return;

uploadBtn.addEventListener('click', async () => {
  try {
    const titleInput = document.querySelector('input[name="title"]');
    const priceInput = document.querySelector('input[name="price"]');

    const title = titleInput?.value.trim();
    const price = priceInput?.value.trim();

    if (!title || !price) {
      alert("Please enter both title and price.");
      return;
    }

    uploadBtn.disabled = true; // prevent double click
    uploadBtn.textContent = "Registering...";

    await addDoc(collection(db, "premiumContent"), {
      title,
      price,
      createdAt: serverTimestamp()
    });

    alert("PDF registered. Now upload the file to storage.");

    titleInput.value = "";
    priceInput.value = "";

  } catch (err) {
    console.error(err);
    alert("Failed to register PDF. Try again.");
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.textContent = "Upload PDF";
  }
});