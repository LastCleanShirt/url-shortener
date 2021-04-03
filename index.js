#!/usr/bin/env node

/* 
 * [x] TODO: Setup-ing this project
 * [x] TODO: Make the bootstrap css and html frontend
 * [x] TODO: Make the basic backend
 * [x] TODO: Make the database and make the url shortener system
 * [ ] TODO: Upgrade!
 * 
 * 
 * */

// Importing some libraries
const express = require("express");
const Datastore = require("nedb");
const bodyParser = require("body-parser");
const path = require("path");
const id = require("./id.js");

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

//database.insert({
//	url: "https://localhost:3000",
//	id: "dancedance"
//})

// Index
App.get("/", function (req, res) {
	database.find({}, function (err, docs) {
		res.render("web/html/index", {
			
		});
		// res.send({});
	});
});

// redirectId
App.get("/:redirectId", function (req, res) {
	const redirectId = req.params.redirectId;
	database.findOne({id: redirectId}, function(err, url){
		console.log(url);
		res.redirect(url["url"]);
	});
});


// Api
App.post("/api/sendToBackend", function (req, res) {
	const url = req.body.url;
	const id_ = id(length=5);
	database.insert({
		url: url,
		id: id_
	});
	res.render("web/html/yourIdIs", {
		short: id_,
		fullurl: url
	});
	// res.redirect("/" + id_);
	//res.render("web/html/index", {
	//	message: "<a href="+ url +">/"+ id +"</a>"
	//});
});

// Listening to port
App.listen(port, server, function () {
	console.log(`Listening at port ${server}:${port}`);
});
