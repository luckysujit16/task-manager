// app.js
const express = require("express");
const app = express();
const port = 3000;
const taskRoutes = require("./test/routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", taskRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
