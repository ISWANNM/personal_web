function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

document.getElementById("projectForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  const file = document.getElementById("uploadImage").files[0];
  const imageBase64 = file ? await toBase64(file) : "";

  const project = {
    title: document.getElementById("projectName").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    description: document.getElementById("description").value,
    technologies: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value),
    image: imageBase64
  };

  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));

  renderProjects();
  document.getElementById("projectForm").reset();
});


function renderProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  projects.forEach((project, index) => {
    projectList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <img src="${project.image}" class="card-img-top" alt="${project.title}">
          <div class="card-body">
            <h5><a href="detail-project.html?id=${index}" class="text-decoration-none">${project.title}</a></h5>
            <p class="card-text">${project.description.substring(0, 60)}...</p>
            <p><strong>Tech:</strong> ${project.technologies.join(", ")}</p>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderProjects);
