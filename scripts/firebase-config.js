// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2uosoPQ-6PoOCZNzHuQ3E6CGDkTpoN9A",
    authDomain: "sports-buddy-3105d.firebaseapp.com",
    projectId: "sports-buddy-3105d",
    storageBucket: "sports-buddy-3105d.firebasestorage.app",
    messagingSenderId: "365956802071",
    appId: "1:365956802071:web:92901d4e4e564e0254de52"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

export { auth, db };
