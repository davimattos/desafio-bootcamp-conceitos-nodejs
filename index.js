const express = require("express");

const app = express();
app.use(express.json());

let projects = [];

app.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(proj => proj.id == id);

  if (!project) {
    return res.status(400).json({ error: " Project not found!" });
  }

  return next();
}

app.post("/projects", (req, res) => {
  const id = Math.floor(Math.random() * 500);
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  return res.json(project);
});

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);
  project.title = title;

  return res.json(project);
});

app.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  let projIndex = projects.findIndex(proj => proj.id == id);
  projects.splice(projIndex, 1);

  return res.send();
});

app.post("/projects/:id/tasks", checkProjectExists, (req, res) => {});

app.post("/projects", (req, res) => {});

app.listen(3000);
