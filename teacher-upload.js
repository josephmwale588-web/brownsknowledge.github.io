import { auth, db } from './auth.js';
import { collection, addDoc } from "firebase/firestore";
if (!userData.schoolId && userData.role === "teacher") {
  alert("You must be linked to a school to upload content.");
  return;
}

document.getElementById('upload').onclick = async () => {
  const user = auth.currentUser;

  await addDoc(collection(db, "teacherContent"), {
    title: title.value,
    subject: subject.value,
    teacherId: user.uid,
    isPremium: access.value === "premium",
    price: price.value || 0,
    downloads: 0,
    createdAt: new Date()
  });

  alert("Content submitted for review.");
};
approved: false
if (access.value === "premium" && !userData.verified) {
  alert("Only verified teachers can sell premium content.");
  return;
}

