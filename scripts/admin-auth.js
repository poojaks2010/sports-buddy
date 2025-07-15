import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    if (email === "admin@sportsbuddy.com") {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Admin login successful");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Access denied: Not an admin");
    }
  } catch (error) {
    alert("Admin login failed: " + error.message);
  }
});
