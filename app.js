const express = require("express");
const app = express();
const port = 3000;
const tasksRouter = require("./routes/tasks"); // Ensure the path is correct

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", tasksRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
