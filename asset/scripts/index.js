// Convert file ke Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Submit form
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

// Render project list
function renderProjects(filter = "all") {
  let allProjects = JSON.parse(localStorage.getItem("projects")) || [];

  // Simpan index
  let projects = allProjects.map((p, i) => ({ ...p, originalIndex: i }));

  // Filter 
  if (filter && filter !== "all") {
    projects = projects.filter(p => p.technologies.includes(filter));
  }

  // Sort by title 
  projects = projects.sort((a, b) => a.title.localeCompare(b.title));

  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  if (projects.length === 0) {
    projectList.innerHTML = `<p class="text-center text-muted">No projects found</p>`;
    return;
  }

  // Render 
  projectList.innerHTML = projects.map(project => `
    <div class="col-md-4 mb-4">
      <div class="card shadow-sm h-100">
        <img src="${project.image}" class="card-img-top" alt="${project.title}">
        <div class="card-body">
          <h5>
            <a href="detail-project.html?id=${project.originalIndex}" class="text-decoration-none">
              ${project.title}
            </a>
          </h5>
          <p class="card-text">${project.description.substring(0, 60)}...</p>
          <p><strong>Tech:</strong> ${project.technologies.join(", ")}</p>
        </div>
      </div>
    </div>
  `).join("");

  // Reduce 
  const techCount = allProjects.reduce((acc, p) => {
    p.technologies.forEach(t => acc[t] = (acc[t] || 0) + 1);
    return acc;
  }, {});

  console.log("Jumlah project per teknologi:", techCount);
}

// Event filter
document.getElementById("filterTech").addEventListener("change", function () {
  const val = this.value || "all"; // fallback kalau kosong
  renderProjects(val);
});

// Render awal
document.addEventListener("DOMContentLoaded", () => renderProjects());
