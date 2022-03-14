// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3000;
const server = app.listen(port, () => 
console.log(`server is running on http://localhost:${port}`));

// Get Request
app.get("/data", (req, res) => {
    res.send(projectData);
});

// Post Request
app.post("/addData", (req, res) => {
    projectData = req.body; 
    res.send(projectData);
});
