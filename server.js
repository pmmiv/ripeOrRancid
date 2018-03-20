// Add code to userModel.js to complete the model

var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var port = process.env.PORT || 3000;


// Requiring the `User` model for accessing the `users` collection
// I don't think I'll need this because I'm using mongo
// var User = require("./userModel.js");

// Initialize Express
var app = express();

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// routes
// ===================================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/userdb", {
  // useMongoClient: true
// });

// Start the server
app.listen(port, function() {
  console.log("App running on port " + port + "!");
});
