const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let project = projects.find((p, index) => index == projectId);

if (project) {
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-image").src = project.image;
    document.getElementById("project-description").innerText = project.description;
    document.getElementById("start-date").innerText = project.startDate;
    document.getElementById("end-date").innerText = project.endDate;
    document.getElementById("duration").innerText = project.duration;

    let techList = document.getElementById("tech-list");
    project.technologies.forEach(tech => {
        let li = document.createElement("li");
        li.innerText = tech;
        techList.appendChild(li);
    });
}
