/* =========================================================
   TEACHER EARNINGS DASHBOARD
   earnings.js
========================================================= */

import { db } from './auth.js';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";

/**
 * Fetches teacher earnings and transaction history
 * @param {string} teacherId - Firebase UID of the teacher
 * @returns {Object} { totalEarnings, transactions: [] }
 */
export async function getTeacherEarnings(teacherId) {
  if (!teacherId) throw new Error("Teacher ID is required");

  try {
    // Fetch teacher profile to get total earnings
    const teacherSnap = await getDoc(doc(db, "users", teacherId));
    if (!teacherSnap.exists()) throw new Error("Teacher not found");

    const teacherData = teacherSnap.data();
    const totalEarnings = teacherData.totalEarnings || 0;

    // Fetch transactions for this teacher
    const txQuery = query(
      collection(db, "transactions"),
      where("teacherId", "==", teacherId),
      orderBy("date", "desc")
    );

    const txSnap = await getDocs(txQuery);
    const transactions = [];
    txSnap.forEach(tx => {
      transactions.push({
        id: tx.id,
        ...tx.data()
      });
    });

    return { totalEarnings, transactions };

  } catch (err) {
    console.error("Failed to fetch earnings:", err);
    return { totalEarnings: 0, transactions: [], error: err };
  }
}

/**
 * Displays earnings on the dashboard
 * @param {string} teacherId
 * @param {string} totalSelector - DOM selector for total earnings display
 * @param {string} listSelector - DOM selector for transaction list
 */
export async function displayTeacherEarnings(teacherId, totalSelector, listSelector) {
  const totalEl = document.querySelector(totalSelector);
  const listEl = document.querySelector(listSelector);

  if (!totalEl || !listEl) return;

  const { totalEarnings, transactions, error } = await getTeacherEarnings(teacherId);

  if (error) {
    totalEl.textContent = "Failed to load earnings";
    listEl.innerHTML = "<p>Could not load transactions.</p>";
    return;
  }

  // Display total earnings
  totalEl.textContent = `MWK ${totalEarnings.toLocaleString()}`;

  // Display transaction list
  listEl.innerHTML = "";
  if (transactions.length === 0) {
    listEl.innerHTML = "<p>No transactions yet.</p>";
  } else {
    transactions.forEach(tx => {
      const card = document.createElement("div");
      card.className = "card transaction-card";
      card.innerHTML = `
        <h4>${tx.contentId}</h4>
        <p>Student: ${tx.studentId}</p>
        <p>Amount: MWK ${tx.amount.toLocaleString()}</p>
        <p>Teacher Share: MWK ${tx.teacherShare.toLocaleString()}</p>
        <p>Date: ${tx.date?.toDate ? tx.date.toDate().toLocaleString() : "N/A"}</p>
      `;
      listEl.appendChild(card);
    });
  }
}

/* --------------------------
   AUTO INIT EXAMPLE
-------------------------- */
// If you have a teacher dashboard page
// const teacherId = "firebase-uid-here";
// displayTeacherEarnings(teacherId, "#totalEarnings", "#transactionList");

