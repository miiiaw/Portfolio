import ProjectCard from "./ProjectCard";

export default function Home({ projects, setProjects }) {
  // Funksjon for å telle antall elementer i hver kategori
  const countCatProjects = (category) => {
    return projects.filter((project) =>
      project.tech.some((tech) => tech.toLowerCase() === category.toLowerCase())
    ).length;
  };
  return (
    <>
      <h1>This is the front page. Hello!</h1>
      <h2>Project categories:</h2>
      <nav id="catNav">
        <ul>
          <li>
            <a href="">HTML</a> - {countCatProjects("html")}
          </li>
          <li>
            <a href="">CSS</a> - {countCatProjects("css")}
          </li>
          <li>
            <a href="">JavaScript</a> - {countCatProjects("javascript")}
          </li>
          <li>
            <a href="">Figma</a> - {countCatProjects("figma")}
          </li>
        </ul>
      </nav>
      <section id="projectsList">
        {projects.length === 0 ? (
          <p>Ingen prosjekter</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              setProjects={setProjects}
            />
          ))
        )}
      </section>
    </>
  );
}
