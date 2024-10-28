export default function CategoryNavigation({ projects }) {
  // Funksjon for å telle antall elementer i hver kategori
  const countCatProjects = (category) => {
    return projects.filter((project) =>
      project.tech.some((tech) => tech.toLowerCase() === category.toLowerCase())
    ).length;
  };

  return (
    <>
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
    </>
  );
}
