/* =========================================================
   TEACHER PROFILE PAGE LOGIC (REFINED)
========================================================= */

import { db } from './auth.js';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

async function loadTeacherProfile() {
  /* --------------------------
     GET TEACHER ID
  -------------------------- */
  const params = new URLSearchParams(window.location.search);
  const teacherId = params.get('id');

  if (!teacherId) {
    alert("Invalid teacher profile.");
    return;
  }

  /* --------------------------
     LOAD TEACHER DATA
  -------------------------- */
  const teacherRef = doc(db, "users", teacherId);
  const teacherSnap = await getDoc(teacherRef);

  if (!teacherSnap.exists()) {
    alert("Teacher not found.");
    return;
  }

  const teacher = teacherSnap.data();

  document.getElementById('teacherName').textContent = teacher.name || "Teacher";
  document.getElementById('teacherBio').textContent = teacher.bio || '';

  if (teacher.verified) {
    document.getElementById('teacherBadge').innerHTML =
      `<span class="verified-badge">✔ Verified Teacher</span>`;
  }

  /* --------------------------
     LOAD TEACHER CONTENT
  -------------------------- */
  const contentQuery = query(
    collection(db, "teacherContent"),
    where("teacherId", "==", teacherId),
    where("approved", "==", true)
  );

  const contentSnap = await getDocs(contentQuery);
  const contentContainer = document.getElementById('teacherContent');

  contentContainer.innerHTML = "";

  contentSnap.forEach(docSnap => {
    const c = docSnap.data();

    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
      <h4>${c.title}</h4>
      <p>MWK ${c.price}</p>
    `;

    contentContainer.appendChild(card);
  });

  /* --------------------------
     LOAD REVIEWS
  -------------------------- */
  const reviewQuery = query(
    collection(db, "reviews"),
    where("teacherId", "==", teacherId)
  );

  const reviewSnap = await getDocs(reviewQuery);
  const reviewsDiv = document.getElementById('reviews');

  reviewsDiv.innerHTML = "";

  reviewSnap.forEach(r => {
    const rev = r.data();

    const p = document.createElement('p');
    p.textContent = `⭐ ${rev.rating}/5 – ${rev.comment}`;

    reviewsDiv.appendChild(p);
  });
}

/* --------------------------
   INIT
-------------------------- */
loadTeacherProfile().catch(err => {
  console.error(err);
  alert("Failed to load teacher profile.");
});