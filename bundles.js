import { db } from './auth.js';
import { collection, getDocs } from "firebase/firestore";

const list = document.getElementById('bundleList');
const snap = await getDocs(collection(db, "bundles"));

snap.forEach(d => {
  const b = d.data();
  list.innerHTML += `
    <div class="card">
      <h4>${b.title}</h4>
      <p>Includes multiple PDFs</p>
      <button class="btn-primary">Unlock – MWK ${b.price}</button>
    </div>
  `;
});

