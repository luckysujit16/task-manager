# Task Manager API

## Project Description

This project implements a RESTful API for a simple task manager application using Node.js, Express.js, and in-memory data storage. The API supports CRUD operations for tasks, filtering, sorting, and priority levels.

## Features

- Create, Read, Update, Delete tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Assign priority levels (low, medium, high) to tasks
- Retrieve tasks based on priority level

## Endpoints

### Default Route
- **GET /**: Returns a 400 Bad Request with a message to use a proper API endpoint.

### Retrieve All Tasks
- **GET /tasks**: Retrieve all tasks with optional filtering and sorting.
  - **Query Parameters**: 
    - `completed` (Boolean): Filter tasks based on completion status (true/false).
    - `sortBy` (String): Sort tasks by creation date (use `creationDate`).

### Retrieve a Single Task
- **GET /tasks/:id**: Retrieve a single task by its ID.
  - **Parameters**: 
    - `id` (Number): The ID of the task.

### Create a New Task
- **POST /tasks**: Create a new task.
  - **Body**: 
    - `title` (String): The title of the task (required).
    - `description` (String): The description of the task (required).
    - `completed` (Boolean): The completion status of the task (required).
    - `priority` (String): The priority level of the task (`low`, `medium`, `high`).

### Update an Existing Task
- **PUT /tasks/:id**: Update an existing task by its ID.
  - **Parameters**: 
    - `id` (Number): The ID of the task.
  - **Body**: 
    - `title` (String): The title of the task (required).
    - `description` (String): The description of the task (required).
    - `completed` (Boolean): The completion status of the task (required).
    - `priority` (String): The priority level of the task (`low`, `medium`, `high`).

### Delete a Task
- **DELETE /tasks/:id**: Delete a task by its ID.
  - **Parameters**: 
    - `id` (Number): The ID of the task.

### Retrieve Tasks Based on Priority Level
- **GET /tasks/priority/:level**: Retrieve tasks based on priority level.
  - **Parameters**: 
    - `level` (String): The priority level (`low`, `medium`, `high`).

## Installation

### Prerequisites

- Node.js v18 or above
- npm

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager


# Example API Requests

## Retrieve All Tasks

curl -X GET http://localhost:3000/tasks

## Retrieve a Single Task by ID

curl -X GET http://localhost:3000/tasks/1

## Create a New Task

curl -X POST http://localhost:3000/tasks \
 -H "Content-Type: application/json" \
 -d '{"title":"New Task","description":"New Task Description","completed":false,"priority":"medium"}'

## Update an Existing Task

curl -X PUT http://localhost:3000/tasks/1 \
 -H "Content-Type: application/json" \
 -d '{"title":"Updated Task","description":"Updated Task Description","completed":true,"priority":"low"}'

## Delete a Task

curl -X DELETE http://localhost:3000/tasks/1

## Retrieve Tasks Based on Priority Level

curl -X GET http://localhost:3000/tasks/priority/high

## Retrieve Filtered and Sorted Tasks

curl -X GET "http://localhost:3000/tasks?completed=true&sortBy=creationDate"

# Task Model

{
"id": 1,
"title": "Set up environment",
"description": "Install Node.js, npm, and git",
"completed": true,
"priority": "high"
}

# License

### ISC License

Permission to use, copy, modify, and distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

# Author

Sujit Shankarrao Jadhav

## Contact Details

### Official Email: sujit.jadhav@aaressinfomedia.com

### Contact Number: 8433968509

### website: https://aaressinfomedia.com

This `README.md` file provides comprehensive information about the project, including details on the endpoints, installation steps, and example API requests. This should make it easy for anyone to understand how to use and test the API.
