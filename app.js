//declaring express middleware and file managers
const express = require("express");
const app = express();

//open the client html, js, and css files
app.use(express.static("./Client"));
app.use(express.json());

//express path middleware functions
app.all("*", (req,res) => {
    res.status(404).send("<h1 style='text-align: center'> Page not Found...<h1>");
});

//express listener
const appName = "Express Middleware";
const port = 5000;
app.listen(port, () => {
    console.log(`${appName} is running on port ${port}`);
});
