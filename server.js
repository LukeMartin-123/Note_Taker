const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// Create express
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });