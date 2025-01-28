// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;

// Middleware to parse JSON and enable CORS
app.use(bodyParser.json());
app.use(cors());

// File path where we will save the submissions
const submissionsFile = "submissions.json";

// Endpoint to handle form submission (as we did earlier)
app.post("/submit", (req, res) => {
  const { name, number, message } = req.body;
  const submission = { name, number, message, timestamp: new Date().toISOString() };

  fs.readFile(submissionsFile, (err, data) => {
    let submissions = [];

    if (err) {
      console.log("File not found, creating a new one.");
    } else {
      submissions = JSON.parse(data);
    }

    submissions.push(submission);

    fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error("Error saving submission:", err);
        return res.status(500).json({ message: "Error saving submission" });
      }
      res.status(200).json({ message: "Form submitted successfully" });
    });
  });
});

// Endpoint to get all submissions
app.get("/submissions", (req, res) => {
  fs.readFile(submissionsFile, (err, data) => {
    if (err) {
      console.error("Error reading submissions:", err);
      return res.status(500).json({ message: "Error reading submissions" });
    }

    let submissions = [];
    if (data) {
      submissions = JSON.parse(data);
    }

    res.status(200).json(submissions);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
