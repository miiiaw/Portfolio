import { useState, useEffect } from "react";
import projectsApi from "../services/api";

function useProjects() {
  // State for prosjektene
  const [projects, setProjects] = useState([]);
  // State for status
  const [loading, setLoading] = useState(true);
  // State for eventuelle feil
  const [error, setError] = useState(null);

  // useEffect som henter prosjektene når hooken brukes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await projectsApi.fetchProjects();
        setProjects(projectsData.projects ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { projects, setProjects, loading, error };
}

export default useProjects;
