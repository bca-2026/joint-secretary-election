import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.querySelector("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const voterId = document.getElementById("voterId").value.trim();
    const voterKey = document.getElementById("voterKey").value.trim();

    console.log("Searching:", voterId, voterKey);

    try {

        const q = query(
            collection(db, "voters"),
            where("voterId", "==", voterId)
        );

        const snap = await getDocs(q);

        console.log("Documents Found:", snap.size);

        if (snap.empty) {
            alert("Voter ID not found");
            return;
        }

        const voter = snap.docs[0].data();

        console.log(voter);

        if (String(voter.voterKey) !== voterKey) {
            alert("Invalid Voter Key");
            return;
        }

        if (voter.hasVoted) {
            alert("You have already voted.");
            return;
        }

        localStorage.setItem("voterId", voterId);

        alert("Login Successful");

        window.location.href = "vote.html";

    } catch (err) {

        console.error(err);

        alert(err.message);

    }

});