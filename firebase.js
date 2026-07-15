// Firebase v10 CDN Modules

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1iC-R7uRH4oUl__Hhh2RGNewtqDNKvKs",
  authDomain: "election-9df59.firebaseapp.com",
  projectId: "election-9df59",
  storageBucket: "election-9df59.firebasestorage.app",
  messagingSenderId: "985088378750",
  appId: "1:985088378750:web:1c8f50c369616e3850952f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };