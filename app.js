const express = require("express");
const app = express();
const connectDB = require("./connect");
const port = 5001;
const appName = "Task Manager";


// MiddleWare
app.use(express.static("./Client"));
app.use(express.json()); // Converts all info to JSON
const tasks = require("./task"); // Imports Model
app.get("/tm/v0/tasks", async (req,res) => {
    try {
        const task = await tasks.find();
        res.status(200).json({task});
    }
    catch (error) {
        res.status(500).json({msg: error});
    }
})
app.post("/tm/v0/tasks", async (req, res) => {
    console.log("got here");
    try {
        const task = await tasks.create(req.body);
        await task.save();
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
      }
})

// Start the Server
const start = async () => {
    try{
        await connectDB();
        app.listen(port, () => {
            console.log(`${appName} is listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(error);
    }
}

start(); // Calls Async Start