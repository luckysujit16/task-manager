// routes/tasks.js
const fs = require("node:fs");
const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Add initial tasks from task.json here
function getTasksFromFile() {
  try {
    const rawData = fs.readFileSync("task.json");
    const tasks = JSON.parse(rawData);
    return tasks;
  } catch (error) {
    console.error("Error reading task.json:", error.message);
    return { tasks: [] }; // Return an object with an empty tasks array if there's an error
  }
}

const tasksArray = getTasksFromFile().tasks;
console.log("Tasks read from file:", tasksArray);

// Default route for invalid API endpoint requests
router.get("/", (req, res) => {
  res
    .status(400)
    .send(
      "Please enter a proper API endpoint with a valid request method (GET, POST, PUT, DELETE, etc.)."
    );
});

// GET /tasks: Retrieve all tasks
router.get("/tasks", (req, res) => {
  res.json(tasksArray);
});

// GET /tasks/:id: Retrieve a single task by its ID
router.get("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.json(task);
});

// GET /tasks/status/:status: Retrieve tasks by completion status
router.get("/tasks/status/:status", (req, res) => {
  const status = req.params.status.toLowerCase();
  let filteredTasks;

  if (status === "completed") {
    filteredTasks = tasksArray.filter((task) => task.completed === true);
  } else if (status === "incomplete") {
    filteredTasks = tasksArray.filter((task) => task.completed === false);
  } else {
    return res
      .status(400)
      .send("Invalid status. Use 'completed' or 'incomplete'.");
  }

  res.json(filteredTasks);
});

// GET /tasks/sortByStatus: Retrieve tasks sorted by completion status
router.get("/tasks/sortByStatus", (req, res) => {
  const { status } = req.query;
  if (status !== "true" && status !== "false") {
    return res.status(400).send("Invalid status value. Please use 'true' or 'false'.");
  }
  const sortedTasks = tasksArray.filter((task) => task.completed === (status === "true"));
  res.json(sortedTasks);
});


// POST /tasks: Create a new task
router.post("/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid task data");
  }
  const newTask = new Task(
    tasksArray.length + 1,
    title,
    description,
    completed
  );
  tasksArray.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task by its ID
router.put("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
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

// DELETE /tasks/:id: Delete a task by its ID
router.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasksArray.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }
  tasksArray.splice(taskIndex, 1);
  res.status(200).send("Task deleted");
});

module.exports = router;
