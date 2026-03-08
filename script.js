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


function displayIssues(issues) {
  const container = document.getElementById("cetagory-container");
  container.innerHTML ="";
    issues.forEach(issue => {
       const div = document.createElement("div");
       div.className = "";
       div.innerHTML =`
        <div class="card1 rounded-2xl w-64 h-64 p-2 border shadow-2xl space-y-3  bg-[#FFFFFF]">
    <div class="space-y-2 ">
<div class="flex justify-between">
    <p>${issue.status}</p>
    <button class="bg-green-200 p-2 rounded-2xl">${issue.priority}</button>
</div>
<div class="">
    <h1 class="font-semibold text-[14px] line-clamp-1 text-[#1F2937]">${issue.title}</h1>
    <p class="text-[14px] line-clamp-2 text-[#64748B]">${issue.description}</p>
</div>
<div>
   <p class="badge badge-outline badge-error"><i class="fa-solid fa-bug"></i>${issue.labels}</p>
   <p class="badge badge-outline badge-warning"><i class="fa-regular fa-life-ring"></i>${issue.labels}</p>
</div>
        </div>
        <hr>
        <div class="">
<p>#1by john_doe</p>
<p>1/15/2024</p>
        </div>
     </div> 
       `;
    container.appendChild(div)
    });
}
allIssue()