class Task {
  constructor(id, title, description, completed, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority || 'medium'; // Default priority is 'medium'
  }
}

module.exports = Task;
