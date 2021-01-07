const router = require("express").Router();
const fs = require('fs');
//const nodemon = require("nodemon");
const path = require('path');
const util = require("util");
const { v4: uuidv4 } = require('uuid');

// Setup the notes variable
// fs.readFile("db/db.json", "utf8", (err, data) => {

//     if (err) throw err;

//     var notes = JSON.parse(data);

//     // Setup the api/notes get route
//     app.get("/api/notes", function (req, res) {
//         res.json(notes);
//     });

//     // notes post route
//     app.post("/api/notes", function (req, res) {
//         var newNote = req.body;
//         notes.push(newNote);
//         updateData();
//     });

//     // Retrieves a note
//     app.get("/api/notes/:id", function (req, res) {
//         res.json(notes[req.params.id]);
//     });

//     // Deletes a note
//     app.delete("/api/notes:id", function (req, res) {
//         notes.splice(req.params.id, 1);
//         updateData();
//     });


// function updateData() {
//     fs.writeFile("db/db.json",JSON.stringify(notes) ,err => {
//         if (err) throw err;
//         return true;
//     });
// }
//});

const asyncRead = util.promisify(fs.readFile);

const asyncWrite = util.promisify(fs.writeFile);

const getNotes = () => {
    console.log(path.join(__dirname, "../db/db.json"));
    return asyncRead(path.join(__dirname, "../db/db.json"), "utf8").then((notes) => {
        return JSON.parse(notes);
    });
};

//get the notes route
router.get("/api/notes", function (req, res) {
    getNotes().then((notes) => {
        res.json(notes);
    });
});

const addNote = (newnote) => {
    //create the new note - add id
    const newNote = newnote;
    newNote.id = uuidv4();

    return getNotes().then((notes) => {
        //add the new note to the read file
        const newNotes = notes;
        newNotes.push(newNote);
        //write the updated list of notes back to db.json
        asyncWrite(path.join(__dirname, "../db/db.json"),JSON.stringify(newNotes));

        return newNote;
    });
}

//post route - add note
router.post("/api/notes", function (req, res) {
    addNote(req.body).then((note) => {
        res.json(note);
    });
});

const deleteNote = (id) => {
    //get the data
    return getNotes().then((notes) => {
        //modify the data
        const oldNotes = notes;
        const notesFiltered = oldNotes.filter((note) => note.id !== id);
        //overwrite the old notes db.json
        asyncWrite(path.join(__dirname, "../db/db.json"),JSON.stringify(notesFiltered));

        return id;
    });
    
}

//delete route
router.delete("/api/notes/:id", function (req, res) {
    deleteNote(req.params.id).then((id) => {
        res.json(id);
    });
});

// Basic route that sends the user to the notes page
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Basic route that sends the user first to the index Page
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;




