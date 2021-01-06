const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();


module.exports = function(app) {

// Basic route that sends the user to the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Basic route that sends the user first to the index Page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

}

app.get("/notes", function (req, res) {
    res.json(newNote);
});





