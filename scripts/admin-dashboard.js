// Firebase imports
import { auth, db } from './firebase-config.js';
import {
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ✅ Check if admin is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin.html";
  }
});

// ✅ Save Sports Category
document.getElementById("addCategoryBtn").addEventListener("click", async () => {
  const value = document.getElementById("categoryInput").value.trim();
  if (!value) return alert("Enter a category name");

  await addDoc(collection(db, "categories"), { name: value });
  alert("Category saved.");
});

// ✅ Save City
document.getElementById("addCityBtn").addEventListener("click", async () => {
  const value = document.getElementById("cityInput").value.trim();
  if (!value) return alert("Enter a city name");

  await addDoc(collection(db, "cities"), { name: value });
  alert("City saved.");
});

// ✅ Save Area
document.getElementById("addAreaBtn").addEventListener("click", async () => {
  const value = document.getElementById("areaInput").value.trim();
  if (!value) return alert("Enter an area name");

  await addDoc(collection(db, "areas"), { name: value });
  alert("Area saved.");
});

// ✅ Delete Category
document.getElementById("deleteCategoryBtn").addEventListener("click", async () => {
  const nameToDelete = document.getElementById("deleteCategoryInput").value.trim();
  if (!nameToDelete) return alert("Enter a category to delete");

  const snapshot = await getDocs(collection(db, "categories"));
  snapshot.forEach(async (docSnap) => {
    if (docSnap.data().name === nameToDelete) {
      await deleteDoc(doc(db, "categories", docSnap.id));
      alert("Category deleted");
    }
  });
});

// ✅ Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "admin.html";
});

// ✅ Send Password Reset Email
document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
  const email = document.getElementById("resetEmail").value.trim();
  if (!email) return alert("Please enter a user email");

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent to " + email);
  } catch (error) {
    alert("Error sending reset: " + error.message);
  }
});

// ✅ Check if User Exists (email check)
document.getElementById("checkUserBtn").addEventListener("click", async () => {
  const email = document.getElementById("checkUserEmail").value.trim();
  const resultBox = document.getElementById("userCheckResult");

  if (!email) {
    resultBox.textContent = "⚠️ Please enter an email.";
    resultBox.style.color = "red";
    return;
  }

  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    console.log("Checking email:", email);
    console.log("Sign-in methods:", methods);

    if (methods.length > 0) {
      resultBox.textContent = `✅ User exists with email: ${email}`;
      resultBox.style.color = "green";
    } else {
      resultBox.textContent = `❌ No user found with email: ${email}`;
      resultBox.style.color = "red";
    }
  } catch (error) {
    console.error("Error checking user:", error.message);
    resultBox.textContent = `Error: ${error.message}`;
    resultBox.style.color = "red";
  }
});
