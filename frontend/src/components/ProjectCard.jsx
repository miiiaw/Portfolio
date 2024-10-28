import projectsApi from "../services/api";

export default function ProjectCard({ project, setProjects }) {
  // Funksjon for å sende forespørsel om å slette et prosjekt på serveren
  const handleRemoveProject = async (id) => {
    try {
      // Kaller removeProject og henter oppdatert fil fra server
      const getUpdatedProjects = await projectsApi.removeProject(id);

      // Oppdaterer staten
      if (getUpdatedProjects) {
        setProjects(getUpdatedProjects.projects);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="projectCard">
        <button
          className="removeButton"
          onClick={() => handleRemoveProject(project.id)}
        >
          X
        </button>
        <article className="projectText">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <footer className="projectFooter">
            <ul>
              {project.tech.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </footer>
        </article>
      </section>
    </>
  );
}
