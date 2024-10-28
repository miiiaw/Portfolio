import { ofetch } from "ofetch";
import { endpoints } from "../config/baseUrls";

// Funksjon for å hente prosjektene
const fetchProjects = async () => {
  try {
    const response = await ofetch(`${endpoints.projects}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Funksjon for å legge til prosjekt
export const addProject = async (projectData) => {
  try {
    await fetch(`${endpoints.addProject}`, {
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
    await ofetch(`${endpoints.projects}/${id}`, {
      method: "DELETE",
    });
    // Hent og returner den oppdaterte filen fra serveren
    const updatedProjects = await fetchProjects();
    return updatedProjects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { fetchProjects, addProject, removeProject };
