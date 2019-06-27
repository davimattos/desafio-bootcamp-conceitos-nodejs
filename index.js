const express = require("express");

const app = express();
app.use(express.json());

let projects = [];

app.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });
});

app.listen(3000);
