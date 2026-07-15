import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("adminLogin");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful");

        window.location.href = "dashboard.html";

    } catch (err) {

        console.error(err);

        error.innerHTML = err.code + "<br>" + err.message;

    }

});