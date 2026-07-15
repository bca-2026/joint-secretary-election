import { db, auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

async function loadDashboard(){

const voters=await getDocs(collection(db,"voters"));

const candidates=await getDocs(collection(db,"candidates"));

const votes=await getDocs(collection(db,"votes"));

document.getElementById("totalVoters").innerHTML=voters.size;

document.getElementById("votesCast").innerHTML=votes.size;

document.getElementById("remainingVotes").innerHTML=voters.size-votes.size;

document.getElementById("candidateCount").innerHTML=candidates.size;

}

loadDashboard();

document.getElementById("logout").onclick=async()=>{

await signOut(auth);

window.location="login.html";

}