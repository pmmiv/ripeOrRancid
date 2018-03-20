var path = require("path");

module.exports = function(app) {

	app.get("/", function(req, res) {
	  res.render("index");
	});

	app.get("/ripe", function(req, res) {
	  res.render("ripe");
	});

	app.get("/rancid", function(req, res) {
	  res.render("rancid");
	});
};