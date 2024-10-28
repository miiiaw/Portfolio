import { useState } from "react";
import { addProject } from "../services/api";
import { projectSchema } from "../helpers/zodSchema";

export default function NewProjectForm() {
  // useState for å holde på skjemadataen
  const [projectData, setProjectData] = useState({
    title: "",
    date: "",
    description: "",
    tech: [],
    status: "draft",
    public: false,
  });

  // Funksjon for å håndtere innsending av skjema
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validerer dataene med Zod
    try {
      const validatedData = projectSchema.parse({
        ...projectData,
        public: projectData.status === "published",
      });

      // Send de validerte dataene til API-en
      await addProject(validatedData);

      // Nullstill skjemaet
      setProjectData({
        title: "",
        date: "",
        description: "",
        tech: [],
        status: "draft",
      });
    } catch (error) {
      console.error(error);
    }
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

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      status: value,
      public: value === "published",
    }));
  };

  return (
    <>
      <section id="addProjectForm">
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
            <legend>Select category:</legend>
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

          <fieldset>
            <legend>Select project status:</legend>
            <label>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={projectData.status === "draft"}
                onChange={handleStatusChange}
              />
              Draft
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="published"
                checked={projectData.status === "published"}
                onChange={handleStatusChange}
              />
              Published
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
