// From the BigRed//Hacks Intro to Back End Web Dev Hack-Shop
// Created by Shea Belsky 2017
// MIT Licensed

// Modules
const express  = require("express");
const mongoose = require("mongoose");

// Initialize express
const app = express();

// Give us some detailed logging for our app
app.use(require("morgan")("dev"));

// Set our view engine to Pug, which lets us combine HTML with JavaScript easily
// https://pugjs.org
app.set("view engine", "pug");
app.set("views", "./views");

// Connect Mongoose
mongoose.connect("mongodb://localhost/popularity_api", {
    useMongoClient: true,
});

// Require our route functions, and plug them into their respective route
const home       = require("./routes/home.js");
const popularity = require("./routes/api/popularity.js");

// If someone sends a GET requests to the home page of our site, run the home function referenced above
app.get("/", home);

// If someone sends a GET request to our popularity API, run the popularity function referenced above
app.get("/popularity/:netid", popularity);

// Initialize the server, listening on port 3000
app.listen(3000, () => {
    console.log("Popularity API listening on port 3000");
});
