// routes/tasks.js
const fs = require("node:fs");
const express = require("express");
const router = express.Router();
const Tasks = require("../models/task");

// Add initial tasks from task.json here
function getTasksFromFile() {
  try {
    const rawData = fs.readFileSync("task.json");
    const tasks = JSON.parse(rawData);
    return tasks;
  } catch (error) {
    console.error("Error reading task.json:", error.message);
    return []; // Return an empty array if there's an error like file does not exist or is not a valid JSON
  }
}

const tasksArray = getTasksFromFile().tasks;
console.log("Tasks read from file:", getTasksFromFile().tasks);

router.get("/tasks", (req, res) => {
  res.json(Tasks);
});

router.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.json(task);
});

router.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid task data");
  }
  const newTask = new Task(tasks.length + 1, title, description, completed);
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid task data");
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  res.json(task);
});

router.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }
  tasks.splice(taskIndex, 1);
  res.status(200).send("Task deleted");
});

module.exports = router;
