import { db } from "./firebase.js";

import {

collection,
getDocs,
query,
where,
doc,
updateDoc,
addDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let voterDocument="";
let selectedCandidate="";

document.getElementById("loginBtn").onclick=async()=>{

const voterId=document.getElementById("voterId").value.trim();

const voterKey=document.getElementById("voterKey").value.trim();

const q=query(

collection(db,"voters"),

where("voterId","==",voterId),

where("voterKey","==",voterKey)

);

const snap=await getDocs(q);

if(snap.empty){

alert("Invalid Voter ID or Voter Key");

return;

}

const voter=snap.docs[0];

voterDocument=voter.id;

const data=voter.data();

if(data.hasVoted){

alert("You have already voted.");

return;

}

document.getElementById("loginBox").style.display="none";

document.getElementById("voteBox").style.display="block";

loadCandidates();

};
async function loadCandidates() {

    const snap = await getDocs(collection(db, "candidates"));

    const list = document.getElementById("candidateList");

    list.innerHTML = "";

    snap.forEach((docSnap) => {

        const data = docSnap.data();

        list.innerHTML += `
        <div class="card">

            <input
                type="radio"
                name="candidate"
                value="${docSnap.id}">

            <br><br>

            <img src="${data.photo}" alt="Candidate">

            <h2>${data.name}</h2>

            <h3>${data.party}</h3>

        </div>
        `;
    });

    // THIS WAS MISSING
    document.querySelectorAll("input[name='candidate']").forEach((radio) => {

        radio.addEventListener("change", () => {

            selectedCandidate = radio.value;

            console.log("Selected:", selectedCandidate);

        });

    });

}

document.getElementById("voteBtn").onclick = async () => {

    const selected = document.querySelector("input[name='candidate']:checked");

    if (!selected) {
        alert("Please select a candidate");
        return;
    }

    selectedCandidate = selected.value;

    // Continue with your existing code...

};