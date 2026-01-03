/* =========================================================
   ADMIN TEACHER VERIFICATION DASHBOARD
========================================================= */

import { db } from './auth.js';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

async function loadUnverifiedTeachers() {
  const list = document.getElementById('verifyTeachers');
  if (!list) return;

  try {
    const snap = await getDocs(collection(db, "users"));
    list.innerHTML = ""; // clear previous content

    snap.forEach(d => {
      const u = d.data();

      if (u.role === "teacher" && u.approved && !u.verified) {
        const container = document.createElement('div');
        container.className = "teacher-card";

        const name = document.createElement('span');
        name.textContent = u.name;
        container.appendChild(name);

        const btn = document.createElement('button');
        btn.textContent = `Verify`;
        btn.className = "btn-secondary verify-btn";

        btn.addEventListener('click', async () => {
          const confirmVerify = confirm(`Are you sure you want to verify ${u.name}?`);
          if (!confirmVerify) return;

          try {
            await updateDoc(doc(db, "users", d.id), { verified: true });
            alert(`${u.name} has been verified.`);
            container.remove(); // remove the button/card dynamically
          } catch (err) {
            console.error(err);
            alert("Failed to verify teacher. Try again.");
          }
        });

        container.appendChild(btn);
        list.appendChild(container);
      }
    });

    if (list.children.length === 0) {
      list.innerHTML = "<p>No teachers pending verification.</p>";
    }

  } catch (err) {
    console.error(err);
    alert("Failed to load teachers. Check your connection.");
  }
}

/* --------------------------
   INIT
-------------------------- */
loadUnverifiedTeachers();