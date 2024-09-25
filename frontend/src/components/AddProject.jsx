import { useState } from "react";
import { addProject } from "../services/api";

export default function AddProject() {
  // useState for å holde på skjemadataen
  const [projectData, setProjectData] = useState({
    title: "",
    date: "",
    description: "",
    tech: [],
  });

  // Funksjon for å håndtere innsending av skjema
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Bruker addProject-funksjonen importert fra projectService.js
    await addProject(projectData);

    // Nullstiller skjemaet igjen
    setProjectData({
      title: "",
      date: "",
      description: "",
      tech: [],
    });
  };

  // Funksjon for å håndtere endringer i input-feltene
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Oppdaterer kun det feltet som er endret
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funksjon for å håndtere endringer i tech-boksene
  const handleTechChange = (event) => {
    const { value, checked } = event.target;

    setProjectData((prevData) => {
      if (checked) {
        // Legg til
        return { ...prevData, tech: [...prevData.tech, value] };
      } else {
        // Ikke legg til
        return {
          ...prevData,
          tech: prevData.tech.filter((tech) => tech !== value),
        };
      }
    });
  };

  return (
    <>
      <h1>Add a new project</h1>

      <section id="addProjectForm">
        <h2>Add project</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            required
            value={projectData.title}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            required
            value={projectData.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description..."
            required
            value={projectData.description}
            onChange={handleInputChange}
          />

          <fieldset>
            <legend>Select technologies:</legend>
            <label>
              <input
                type="checkbox"
                value="HTML"
                checked={projectData.tech.includes("HTML")}
                onChange={handleTechChange}
              />
              HTML
            </label>
            <label>
              <input
                type="checkbox"
                value="CSS"
                checked={projectData.tech.includes("CSS")}
                onChange={handleTechChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                checked={projectData.tech.includes("JavaScript")}
                onChange={handleTechChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                value="Figma"
                checked={projectData.tech.includes("Figma")}
                onChange={handleTechChange}
              />
              Figma
            </label>
          </fieldset>

          <button type="submit" className="addProjectButton">
            Add
          </button>
        </form>
      </section>
    </>
  );
}
