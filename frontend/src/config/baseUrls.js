const baseUrl = import.meta.env.baseUrl ?? "http://localhost:3000";
const endpoints = {
  projects: `${baseUrl}/projects`,
  addProject: `${baseUrl}/add-project`,
};

export { baseUrl, endpoints as endpoints };
