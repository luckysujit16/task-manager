# Task Manager API

## Project Description

This project implements a RESTful API for a simple task manager application using Node.js, Express.js, and in-memory data storage.

## Endpoints

### Default Route
- **GET /**: Returns a 400 Bad Request with a message to use a proper API endpoint.

### Retrieve All Tasks
- **GET /tasks**: Retrieve all tasks.

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

### Update an Existing Task
- **PUT /tasks/:id**: Update an existing task by its ID.
  - **Parameters**: 
    - `id` (Number): The ID of the task.
  - **Body**: 
    - `title` (String): The title of the task (required).
    - `description` (String): The description of the task (required).
    - `completed` (Boolean): The completion status of the task (required).

### Delete a Task
- **DELETE /tasks/:id**: Delete a task by its ID.
  - **Parameters**: 
    - `id` (Number): The ID of the task.

### Retrieve Tasks Sorted by Completion Status
- **GET /tasks/sortByStatus**: Retrieve tasks sorted by completion status.
  - **Query Parameters**: 
    - `status` (String): The completion status to filter by (`"true"` or `"false"`).

## Usage

### Setup

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies:

```bash
npm install

4. Start the server:
node app.js

5. Run the tests:
npm run test

*** Example API Requests ***

# Retrieve All Tasks

curl -X GET http://localhost:3000/tasks

# Retrieve a Single Task by ID

curl -X GET http://localhost:3000/tasks/1

# Create a New Task

curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"New Task","description":"New Task Description","completed":false}'

# Update an Existing Task

curl -X PUT http://localhost:3000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"title":"Updated Task","description":"Updated Task Description","completed":true}'

# Delete a Task

curl -X DELETE http://localhost:3000/tasks/1

# Retrieve Tasks Sorted by Completion Status

curl -X GET "http://localhost:3000/tasks/sortByStatus?status=true"

# Task Model

{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}

# License

ISC

# Author

Sujit S Jadhav


This `README.md` file includes instructions on how to use each API endpoint, the parameters required, and example requests using `curl`. It ensures that anyone using the API can understand how to pass the exact parameters needed for each request.






