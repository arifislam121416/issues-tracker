
const idModal = document.getElementById("issues_modal_5");


function logingBtn() {
const userName =document.querySelector("#username").value;
const password = document.querySelector("#password").value;
if(userName === "admin" && password === "admin123"){
    window.location.href = "main.html";
}else{
    alert("Wrong Username or Password");
}

}

let allIssuesData = [];
async function allIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();
allIssuesData = data.data;
displayIssues(allIssuesData);
updateCount(allIssuesData);
}

async function newIssueBtn() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}")
  const data = await res.json()
  Date.data
}
const searchInput = document.querySelector('input[placeholder="Search issues..."]');

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    const filteredIssues = allIssuesData.filter(issue => 
        issue.title.toLowerCase().includes(searchText) ||
        issue.description.toLowerCase().includes(searchText) ||
        issue.labels.some(label => label.toLowerCase().includes(searchText))
    );
    displayIssues(filteredIssues);
    updateCount(filteredIssues);
});

const issuesClickBtn = (btns,btn) => {
  const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button =>{
button.classList.remove("btn-primary");
button.classList.add("btn-secondary");
});
btn.classList.remove("btn-secondary");
btn.classList.add("btn-primary");

  if(btns === "all"){
   displayIssues(allIssuesData);
  } else if(btns ==="open"){
    const openIssues = allIssuesData.filter(issue => issue.status === "open");
    displayIssues(openIssues);
  }else if(btns === "close"){
const closeIssues = allIssuesData.filter(issue => issue.status === "close");
displayIssues(closeIssues);
  }
}

function displayIssues(issues) {
const container = document.getElementById("cetagory-container");
container.innerHTML = "";

issues.forEach(issue => {
let priorityHtml = "";

if(issue.priority === "high"){
priorityHtml = `<p class="badge badge-error">${issue.priority}</p>`;
}
else if(issue.priority === "medium"){
priorityHtml = `<p class="badge badge-warning">${issue.priority}</p>`;
}
else{
priorityHtml = `<p class="badge badge-success">${issue.priority}</p>`;
}

const labelsHTML = issue.labels.map(label => {

if(label === "bug"){
return `
<p class="badge badge-outline badge-error">
<i class="fa-solid fa-bug"></i> ${label}
</p>
`;
}

else if(label === "help wanted"){
return `
<p class="badge badge-outline badge-warning">
<i class="fa-solid fa-life-ring"></i> ${label}
</p>
`;
}

else{
return `
<p class="badge badge-outline badge-success">
${label}
</p>
`;
}

}).join("");

const div = document.createElement("div");

div.innerHTML = `
<div onclick="showIssueModal(${issue.id})" class="rounded w-[270px] h-[270px] p-2 shadow-2xs bg-white space-y-4 cursor-pointer">
<div class="flex justify-between">
<div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
<i class="fa-solid fa-circle-notch text-green-600"></i>
</div>

<p class=" px-3 py-1 rounded-full text-sm">
${priorityHtml}
</p>
</div>

<h1 class="font-bold text-lg line-clamp-1">
${issue.title}
</h1>

<p class="text-gray-500 text-sm line-clamp-2">
${issue.description}
</p>

<div class="flex gap-2 flex-wrap">
${labelsHTML}
</div>

<hr class="bg-gray-200">

<div class=" text-sm text-gray-500">
<p>#${issue.id} by ${issue.author}</p>
<p>${new Date(issue.updatedAt).toLocaleDateString()}</p>
</div>

</div>
`;

container.appendChild(div);

});
}
function updateCount(issues){
 document.querySelector("h2").innerText = `${issues.length} Issues`;
}

async function showIssueModal(id){
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();
  const issue = data.data;

  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-desc").innerText = issue.description;

  
  idModal.showModal();
}
allIssue()

