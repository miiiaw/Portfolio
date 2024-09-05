import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());
app.use("/statics/*", serveStatic({ root: "./" }));

//Henter prosjekter fra projects.json
app.get("/json", async (c) => {
  const data = await readFile("./projects.json", "utf-8");
  return c.json(JSON.parse(data));
});

//Legger til nytt prosjekt
app.post("/add-project", async (c) => {
  try {
    const newProject = await c.req.json();

    // Leser den eksisterende filen
    const data = await readFile("./projects.json", "utf-8");
    const parsedData = JSON.parse(data);
    // Legger til det nye prosjektet i listen
    parsedData.projects.push(newProject);

    // Skriver den oppdaterte listen tilbake til filen
    await writeFile(
      "./projects.json",
      JSON.stringify(parsedData, null, 2),
      "utf-8"
    );

    return c.json({ message: "Project added successfully" });
  } catch (error) {
    console.error("Error adding project:", error);
    return c.json({ error: "Failed to add project" }, 500);
  }
});

const port = 3999;

console.log("Server is running! Wee!");

serve({
  fetch: app.fetch,
  port,
});
