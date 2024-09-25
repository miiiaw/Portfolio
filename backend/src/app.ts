import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile, writeFile } from "node:fs/promises";
import { projects } from "./data/projects.json";

const app = new Hono();

app.use("/*", cors());

//Henter prosjekter fra projects.json
app.get("/projects", async (c) => {
  const data = await readFile("./src/data/projects.json", "utf-8");
  return c.json(JSON.parse(data));
});

// Legger til et nytt prosjekt i projects.json
app.post("/add-project", async (c) => {
  try {
    const newProject = await c.req.json();
    // Leser den eksisterende filen
    const data = await readFile("./src/data/projects.json", "utf-8");
    const parsedData = JSON.parse(data);

    // Finner det høyeste eksisterende ID-nummeret og lagrer det
    const highestId = parsedData.projects.reduce(
      (maxId: number, project: { id: number }) => {
        return project.id > maxId ? project.id : maxId;
      },
      0
    );
    // Lager en ID til det nye prosjektet
    const newProjectWithId = { id: highestId + 1, ...newProject };
    // Legger til det nye prosjektet i listen
    parsedData.projects.push(newProjectWithId);
    // Skriver den oppdaterte listen tilbake til filen
    await writeFile(
      "./src/data/projects.json",
      JSON.stringify(parsedData, null, 2),
      "utf-8"
    );
    // Returnerer med melding ved suksess eller feil
    return c.json({ message: "Project added successfully" });
  } catch (error) {
    console.error("Error adding project:", error);
    return c.json({ error: "Failed to add project" }, 500);
  }
});

// Slette et valgt prosjekt fra projects.json
app.delete("/projects/:id", async (c) => {
  try {
    // Lese den nyeste versjonen av filen
    const data = await readFile("./src/data/projects.json", "utf-8");
    const parsedData = JSON.parse(data);
    const projects = parsedData.projects;
    // Hente parameter(id'en) fra URL og konverterer den til number
    const id = Number(c.req.param("id"));
    // Bruker .findIndex for å finne indeksen til prosjektet
    const index = projects.findIndex((p: { id: number }) => p.id === id);
    // Legge til feilmelding i fall ingen elementer oppfyller betingelsen over
    if (index === -1) {
      return c.json({ error: "Project not found, adjdfkdhj" }, 404);
    }
    // Fjern prosjektet
    projects.splice(index, 1);
    // Oppdaterer projects.json-filen
    await writeFile(
      "./src/data/projects.json",
      JSON.stringify({ projects }, null, 2),
      "utf-8"
    );
    // Returnerer med melding ved feil eller suksess
    return c.json({ message: "Project deleted successfully, yay!" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json({ error: "Failed to delete project" }, 500);
  }
});

export default app;
