// Henter prosjekter til HTML
const fetchDataFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3999/json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    let projectsList = document.getElementById("projectsList");

    // Tømmer listen igjen før oppdatering
    projectsList.innerHTML = "";

    result.projects.forEach((project) => {
      projectsList.innerHTML += `
        <section class="projectSection">
          <img class="projectImage" src="${project.image}" alt="Project image" />
          <article class="projectText">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
          </article>
        </section>`;
    });
  } catch (error) {
    console.error(error);
  }
};

// Legg til et nytt prosjekt
const addProject = async (event) => {
  event.preventDefault();

  const title = document.getElementById("addProjectText").value;
  const date = document.getElementById("addProjectDate").value;
  const description = document.getElementById("addProjectDescription").value;
  const tech = document.getElementById("addProjectTech").value;
  const image = document.getElementById("addProjectImage").value;
  const url = document.getElementById("addProjectUrl").value;

  const newProject = {
    title,
    date,
    description,
    tech,
    image,
    url,
  };

  try {
    const response = await fetch("http://localhost:3999/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    // Hent oppdatert liste med prosjekter
    await fetchDataFromServer();
  } catch (error) {
    console.error(error);
  }
};

// Event listener for å sende inn skjemaet
document.getElementById("projectForm").addEventListener("submit", addProject);

// Henter prosjekter fra server når siden lastes
fetchDataFromServer();
