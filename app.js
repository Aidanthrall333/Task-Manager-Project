const express = require("express");
const app = express();
const connectDB = require("./connect");
const port = 5001;
const appName = "Task Manager";

// Middleware
app.use(express.static("./Client"));
app.use(express.json()); // Converts all info to JSON
const tasks = require("./task"); // Imports Model

app.post("/tm/v0/tasks", async (req, res) => {
  try {
    const task = new tasks(req.body);
    await task.save();
    console.log("Task saved: ", task);
    res.status(201).json({ task });
  } catch (error) {
    console.log("Error saving task: ", error);
    res.status(500).json({ msg: error });
  }
});

app.get("/tm/v0/tasks", async (req, res) => {
  try {
    const task = await tasks.find();
    console.log("Retrieved tasks: ", task);
    res.status(200).json({ task });
  } catch (error) {
    console.log("Error retrieving tasks: ", error);
    res.status(500).json({ msg: error });
  }
});

app.get("/tm/v0/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await tasks.findById(id);
      console.log("Retrieved task: ", task);
      res.status(200).json({ task });
    } catch (error) {
      console.log("Error retrieving task: ", error);
      res.status(500).json({ msg: error });
    }
  });

app.delete("/tm/v0/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await tasks.findByIdAndDelete(id);
      res.status(200).json({ msg: "Task deleted successfully" });
    } catch (error) {
      console.log("Error deleting task: ", error);
      res.status(500).json({ msg: error });
    }
  });

  app.put("/tm/v0/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await tasks.findByIdAndUpdate(id, req.body);
        console.log("Updated task: ", task);
        res.status(200).json({ task });
      } catch (error) {
        console.log("Error updating task: ", error);
        res.status(500).json({ msg: error });
      }
  });
  

// Start the Server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`${appName} is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(); // Calls Async Start