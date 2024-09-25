import { ofetch } from "ofetch";

const baseUrl = "http://localhost:3000";
const projectsUrl = `${baseUrl}/projects`;

// Funksjon for å hente prosjektene
const fetchProjects = async () => {
  try {
    const response = await ofetch("http://localhost:3000/projects");
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Funksjon for å legge til prosjekt
export const addProject = async (projectData) => {
  try {
    await fetch("http://localhost:3000/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
  } catch (error) {
    console.error(error);
  }
};

// Funksjon for å fjerne et prosjekt
const removeProject = async (id) => {
  try {
    await ofetch(`${projectsUrl}/${id}`, {
      method: "DELETE",
    });
    return id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { fetchProjects, addProject, removeProject };
