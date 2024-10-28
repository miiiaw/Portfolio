import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import MainContainer from "./components/MainContainer";
import AddProjectPage from "./components/AddProjectPage";
import Contact from "./components/Contact";
import WireframesPage from "./components/wireframesPage";
import useProjects from "./services/useProjects";
import { routes } from "./config/routesUrls";

function App() {
  // Variabel for epost
  const contactMail = "miaw@hiof.no";

  // Custom hook for å hente prosjektene
  const { projects, setProjects, loading, error } = useProjects();

  // En useState for å lagre valgt visning, samt hente fra localStorage
  const [projectsDirection, setProjectsDirection] = useState(
    () => localStorage.getItem("projectsDirection") || "horizontal"
  );

  // useEffect for å sette valgt visning av prosjekter
  useEffect(() => {
    localStorage.setItem("projectsDirection", projectsDirection);
  }, [projectsDirection]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>Error loading projects, afksjsh. Error msg: {error.message}</p>;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<MainContainer />} path={routes.home}>
            <Route
              element={
                <Home
                  projects={projects}
                  setProjects={setProjects}
                  projectsDirection={projectsDirection}
                  setProjectsDirection={setProjectsDirection}
                />
              }
              path=""
            />
            <Route element={<AddProjectPage />} path={routes.addProject} />
            <Route
              element={<Contact contactMail={contactMail} />}
              path={routes.contact}
            />
            <Route element={<WireframesPage />} path={routes.wireframes} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
