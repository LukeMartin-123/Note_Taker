const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Create express
const app = express();


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//make public asset accessible
app.use(express.static(path.join(__dirname,'/public')));

//set routes
app.use(require("./routes/html-routes"));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});