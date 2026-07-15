import { db } from "./firebase.js";

import {

collection,
getDocs,
deleteDoc,
doc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tbody=document.querySelector("#voterTable tbody");

const search=document.getElementById("search");

let voters=[];

async function loadVoters(){

tbody.innerHTML="";

const snapshot=await getDocs(collection(db,"voters"));

voters=[];

snapshot.forEach(document=>{

voters.push({

id:document.id,

...document.data()

});

});

display(voters);

}

function display(data){

tbody.innerHTML="";

data.forEach(voter=>{

tbody.innerHTML+=`

<tr>

<td>${voter.voterId}</td>

<td>${voter.name}</td>

<td>${voter.department}</td>

<td>${voter.year}</td>

<td>

${voter.hasVoted ?

"<span style='color:green'>YES</span>"

:

"<span style='color:red'>NO</span>"}

</td>

<td>

${voter.isActive ?

"<span style='color:green'>ACTIVE</span>"

:

"<span style='color:red'>DISABLED</span>"}

</td>

<td>

<button
onclick="deleteVoter('${voter.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

window.deleteVoter=async(id)=>{

if(!confirm("Delete this voter?")) return;

await deleteDoc(doc(db,"voters",id));

loadVoters();

}

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=voters.filter(v=>

v.name.toLowerCase().includes(value)

||

v.voterId.toLowerCase().includes(value)

);

display(filtered);

});

loadVoters();