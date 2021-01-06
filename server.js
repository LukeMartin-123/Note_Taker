const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// Create express
const app = express();

require("./routes/html-routes")(app);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 
app.use(express.static('__dirname')); 

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });