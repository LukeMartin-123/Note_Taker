const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();


module.exports = function (app) {

    // Setup the notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {
       
        if (err) throw err;

        var notes = JSON.parse(data);

        // Setup the api/notes get route
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        // notes post route
        app.post("api/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateData();
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateData();
        });

        // Basic route that sends the user to the notes page
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Basic route that sends the user first to the index Page
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateData() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}




