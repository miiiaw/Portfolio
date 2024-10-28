import ProjectCard from "./ProjectCard";
import DirectionButtons from "./DirectionButtons";
import CategoryNavigation from "./CategoryNavigation";

export default function Home({
  projects,
  setProjects,
  projectsDirection,
  setProjectsDirection,
}) {
  return (
    <>
      <h1>Welcome!</h1>

      <DirectionButtons
        projectsDirection={projectsDirection}
        setProjectsDirection={setProjectsDirection}
      />

      <CategoryNavigation projects={projects} />

      <section id="projectsList" className={`${projectsDirection}`}>
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
