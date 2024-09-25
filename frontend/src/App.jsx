import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import MainContainer from "./components/MainContainer";
import AddProject from "./components/AddProject";
import Contact from "./components/Contact";
import projectsApi from "./services/api";

function App() {
  // Variabel for epost
  const contactMail = "miaw@hiof.no";
  // En useState for å holde på prosjektene
  const [projects, setProjects] = useState([]);
  // useEffect for å hente prosjektene når siden lastes
  useEffect(() => {
    const initializeData = async () => {
      try {
        const projectsPromise = projectsApi.fetchProjects();
        const projectsData = await projectsPromise;
        console.log("Data fetched", projectsData);
        setProjects(projectsData.projects ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    initializeData();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<MainContainer />} path="/">
            <Route
              element={<Home projects={projects} setProjects={setProjects} />}
              path=""
            />
            <Route element={<AddProject />} path="/addProject" />
            <Route
              element={<Contact contactMail={contactMail} />}
              path="/Contact"
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
