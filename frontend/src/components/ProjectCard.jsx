import projectsApi from "../services/api";

export default function ProjectCard({ project, setProjects }) {
  // Funksjon for å kjøre async funksjon, for å sende forespørsel om å slette et prosjekt på serveren, som igjen sletter prosjektet på serveren, deretter oppdatere projects useState
  // Usikker på om det blir helt riktig fremgangsmåte
  const removeProject = async (id) => {
    const removedId = await projectsApi.removeProject(id);
    if (removedId) {
      setProjects((prev) => prev.filter((project) => project.id !== removedId));
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
            onClick={() => removeProject(project.id)}
          >
            Remove project
          </button>
        </footer>
      </section>
    </>
  );
}
