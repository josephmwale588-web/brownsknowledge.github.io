/* =========================================================
   ADMIN TEACHER APPROVAL DASHBOARD
========================================================= */

import { db } from './auth.js';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

async function loadPendingTeachers() {
  const list = document.getElementById('teacherList');
  if (!list) return;

  try {
    const snap = await getDocs(collection(db, "users"));

    list.innerHTML = ""; // clear previous content

    snap.forEach(docu => {
      const u = docu.data();

      if (u.role === "teacher" && !u.approved) {
        const container = document.createElement('div');
        container.className = "teacher-card";

        const name = document.createElement('span');
        name.textContent = u.name;
        container.appendChild(name);

        const btn = document.createElement('button');
        btn.textContent = `Approve`;
        btn.className = "btn-primary approve-btn";

        btn.addEventListener('click', async () => {
          try {
            await updateDoc(doc(db, "users", docu.id), { approved: true });
            alert(`${u.name} approved successfully`);
            container.remove(); // remove only this teacher card
          } catch (err) {
            console.error(err);
            alert("Failed to approve teacher. Try again.");
          }
        });

        container.appendChild(btn);
        list.appendChild(container);
      }
    });

    if (list.children.length === 0) {
      list.innerHTML = "<p>No pending teachers</p>";
    }

  } catch (err) {
    console.error(err);
    alert("Failed to load teachers. Check your connection.");
  }
}

/* --------------------------
   INIT
-------------------------- */
loadPendingTeachers();