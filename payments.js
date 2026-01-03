/* =========================================================
   PAYMENT RECORDING MODULE
========================================================= */

import { db } from './auth.js';
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

/**
 * Records a payment for premium content
 * @param {Object} params
 * @param {string} params.contentId - ID of the premium content
 * @param {string} params.teacherId - Teacher receiving share
 * @param {string} params.studentId - Student making payment
 * @param {number} params.amount - Total payment amount
 */
export async function recordPayment({ contentId, teacherId, studentId, amount }) {
  if (!contentId || !teacherId || !studentId || !amount || amount <= 0) {
    throw new Error("Invalid payment data");
  }

  const teacherShare = amount * 0.7;
  const platformShare = amount * 0.3;

  try {
    // Save transaction
    await addDoc(collection(db, "transactions"), {
      contentId,
      teacherId,
      studentId,
      amount,
      teacherShare,
      platformShare,
      date: serverTimestamp()
    });

    // Update teacher earnings
    await updateDoc(doc(db, "users", teacherId), {
      totalEarnings: increment(teacherShare)
    });

    console.log(`Payment recorded: Student ${studentId}, Content ${contentId}, Teacher ${teacherId}`);
    return { success: true };

  } catch (err) {
    console.error("Failed to record payment:", err);
    return { success: false, error: err };
  }
}