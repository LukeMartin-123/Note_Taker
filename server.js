const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/routes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });