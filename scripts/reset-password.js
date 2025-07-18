import { auth } from './firebase-config.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("resetEmail").value.trim();
  const msg = document.getElementById("resetMsg");

  try {
    await sendPasswordResetEmail(auth, email);
    msg.textContent = "✅ Reset email sent. Check your inbox.";
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = "❌ " + error.message;
    msg.style.color = "red";
  }
});
