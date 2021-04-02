#!/usr/bin/env node

/* 
 * [x] TODO: Setup-ing this project
 * [ ] TODO: Make the bootstrap css and html frontend
 * [ ] TODO: Make the basic backend
 * [ ] TODO: Make the database and make the url shortener system
 * 
 * 
 * */

// Importing some libraries
const express = require("express");
const Datastore = require("nedb");
const bodyParser = require("body-parser");
const path = require("path");

// App
const App = express();

// Nedb
const database = new Datastore("./database/database.db");
database.loadDatabase();

// Variable
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "localhost";

// Use
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(express.static("public"));

// Static directory
App.use(express.static(__dirname + "/public"));

// Set
App.set("views", path.join(__dirname, "public"));
App.set("view engine", "ejs");

// Index
App.get("/", function (req, res) {
	database.find({}, function (err, docs) {
		res.render("web/html/index", {
			
		});
		// res.send({});
	});
});

// Listening to port
App.listen(port, server, function () {
	console.log(`Listening at port ${server}:${port}`);
});
