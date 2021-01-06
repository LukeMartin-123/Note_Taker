const fs = require('fs');
const path = require('path');
const app = express();

// Basic route that sends the user first to the AJAX Page
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Basic route that sends the userto the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// When you go to the notes page, display the data in the notes array
app.get("/notes", function (req, res) {
    res.json(newNote);
});
