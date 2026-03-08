function logingBtn() {
const userName =document.querySelector("#username").value;
const password = document.querySelector("#password").value;
if(userName === "admin" && password === "admin123"){
    window.location.href = "main.html";
}else{
    alert("Wrong Username or Password");
}

}


async function allIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();
displayIssues(data.data);
}


// function displayIssues(issues) {
//   const container = document.getElementById("cetagory-container");
//   container.innerHTML ="";
//     issues.forEach(issue => {
//         const labelsHTML = issue.labels.map(label => {
// return `
// <p class="badge badge-outline badge-error">
// <i class="fa-solid fa-bug"></i> ${label}
// </p>
// `;
// }).join("");
//        const div = document.createElement("div");
//        div.className = "";
//        div.innerHTML =`
 
//         <div class="card1 rounded-2xl w-70 h-70 p-2 border shadow-2xl space-y-4  bg-[#FFFFFF]">
//     <div class=" ">
// <div class="flex justify-between">
//     <p></p>
//     <button class="bg-green-200 p-2 rounded-2xl">${issue.priority}</button>
// </div>
// <div class="">
//     <h1 class="font-semibold text-[14px] line-clamp-1 text-[#1F2937]">${issue.title}</h1>
//     <p class="text-[14px] line-clamp-2 text-[#64748B]">${issue.description}</p>

// </div>
// <div class="flex mt-2">
//    <p class="badge badge-outline badge-success"><i class="fa-solid fa-bug"></i>${labelsHTML}</p>
  
// </div>
//         </div>
//         <hr class="text-gray-400">
//         <div class="">
// <p>Assignee: ${issue.assignee}</p>
// <p>Author: ${issue.author}</p>
// <p>${new Date(issue.updatedAt).toLocaleDateString()}</p>
//         </div>
//      </div> 
//        `;
//     container.appendChild(div)
//     });
// }

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
<div class="rounded w-[270px] h-[270px] p-2   shadow-2xs bg-white space-y-4">

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
allIssue()