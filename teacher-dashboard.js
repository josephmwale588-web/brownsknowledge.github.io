import { auth, db } from './auth.js';
import { doc, getDoc } from "firebase/firestore";

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  document.getElementById('earnings').textContent =
    `MWK ${snap.data().totalEarnings || 0}`;
});

