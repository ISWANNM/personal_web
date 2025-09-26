// scripts/index.js

const projects = [
    {
        title: "Web Portfolio",
        description: "Website portfolio menggunakan HTML, CSS, dan JavaScript.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        technologies: ["React.js", "Node.js"],
        duration: "1 Month"
    },
    {
        title: "E-commerce App",
        description: "Aplikasi toko online dengan fitur cart dan checkout.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        technologies: ["Next.js", "TypeScript"],
        duration: "2 Months"
    }
];


function renderProjects() {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    projects.forEach((project, index) => {
        projectList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${project.image}" class="card-img-top" alt="${project.title}">
          <div class="card-body">
            <h5 class="card-title">
              <a href="detail-project.html" class="text-decoration-none">${project.title}</a>
            </h5>
            <p class="card-text small">${project.description.substring(0, 70)}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Duration: ${project.duration}</small>
            <br>
            <small class="text-muted">Tech: ${project.technologies.join(", ")}</small>
          </div>
        </div>
      </div>
    `;
    });
}

renderProjects();
