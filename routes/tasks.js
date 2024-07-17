const fs = require("fs");
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
  res.status(400).send(
    "Please enter a proper API endpoint with a valid request method (GET, POST, PUT, DELETE, etc.)."
  );
});

// GET /tasks: Retrieve all tasks with optional filtering and sorting
router.get("/tasks", (req, res) => {
  let filteredTasks = tasksArray;

  if (req.query.completed) {
    const completed = req.query.completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === completed);
  }

  if (req.query.sortBy) {
    if (req.query.sortBy === 'creationDate') {
      filteredTasks = filteredTasks.sort((a, b) => a.id - b.id); // Assuming id is the creation date order
    }
  }

  res.json(filteredTasks);
});

// GET /tasks/:id: Retrieve a single task by its ID
router.get("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.json(task);
});

// POST /tasks: Create a new task
router.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid task data");
  }
  const newTask = new Task(tasksArray.length + 1, title, description, completed, priority);
  tasksArray.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task by its ID
router.put("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send("Task not found");
  }
  const { title, description, completed, priority } = req.body;
  if (!title || !description || typeof completed !== "boolean") {
    return res.status(400).send("Invalid task data");
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;
  res.json(task);
});

// DELETE /tasks/:id: Delete a task by its ID
router.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasksArray.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }
  tasksArray.splice(taskIndex, 1);
  res.status(200).send("Task deleted");
});

// GET /tasks/priority/:level: Retrieve tasks based on priority level
router.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(level)) {
    return res.status(400).send("Invalid priority level. Please use 'low', 'medium', or 'high'.");
  }
  const filteredTasks = tasksArray.filter(task => task.priority === level);
  res.json(filteredTasks);
});

module.exports = router;
