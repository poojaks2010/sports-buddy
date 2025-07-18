import { auth, db } from './firebase-config.js';
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const addEventBtn = document.getElementById("addEventBtn");
const eventNameInput = document.getElementById("eventName");
const eventList = document.getElementById("eventList");

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html";
});

// Add new event
addEventBtn.addEventListener("click", async () => {
  const name = eventNameInput.value.trim();
  if (!name) return alert("Please enter an event name.");

  try {
    await addDoc(collection(db, "events"), {
      name,
      timestamp: new Date()
    });
    eventNameInput.value = "";
  } catch (error) {
    alert("Error adding event: " + error.message);
  }
});

// Live update event list
onSnapshot(collection(db, "events"), (snapshot) => {
  eventList.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.className = "left";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = docSnap.data().name;
    nameSpan.className = "event-name";

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = docSnap.data().name;
    inputEdit.style.display = "none";

    left.appendChild(nameSpan);
    left.appendChild(inputEdit);

    const right = document.createElement("div");
    right.className = "right";

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.style.display = "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    updateBtn.onclick = () => {
      nameSpan.style.display = "none";
      inputEdit.style.display = "inline-block";
      updateBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    };

    saveBtn.onclick = async () => {
      const newName = inputEdit.value.trim();
      if (!newName) return alert("Event name cannot be empty.");

      try {
        await updateDoc(doc(db, "events", docSnap.id), { name: newName });
        alert("Event updated!");
      } catch (error) {
        alert("Update failed: " + error.message);
      }
    };

    deleteBtn.onclick = async () => {
      try {
        await deleteDoc(doc(db, "events", docSnap.id));
      } catch (error) {
        alert("Error deleting event: " + error.message);
      }
    };

    right.appendChild(updateBtn);
    right.appendChild(saveBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);
    eventList.appendChild(li);
  });
});
