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
      <section className="projectSection">
        <article className="projectText">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </article>
        <footer className="projectCardFooter">
          <section className="projectsCat">
            <h3>Tech:</h3>
            <ul>
              {project.tech.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </section>
          <button
            className="removeButton"
            onClick={() => handleRemoveProject(project.id)}
          >
            Remove project
          </button>
        </footer>
      </section>
    </>
  );
}
