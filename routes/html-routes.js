var db = require("../models");

module.exports = function(app) {

	//index html route
	app.get("/", function(req, res) {
		db.Article.find({rank: "nothing"}).then(function(dbArticle) {
	  		
	  		var hbsObject = {
	  			articles: dbArticle
	  		}

	  		res.render("index", hbsObject);
		}).catch(function(err) {
			res.json(err);
		}); 
	});

	//ripe html route
	app.get("/ripe", function(req, res) {
		db.Article.find({rank: "ripe"}).then(function(dbArticle) {
	  		var hbsObject = {
	  			ripeArticles: dbArticle
	  		}
	  		console.log(hbsObject);

	  		res.render("ripe", hbsObject);
		}).catch(function(err) {
			console.log(json(err));
		}); 
	});

	app.get("/rancid", function(req, res) {
		db.Article.find({rank: "rancid"}).then(function(dbArticle) {
	  		var hbsObject = {
	  			rancidArticles: dbArticle
	  		}
	  		console.log(hbsObject);

	  		res.render("rancid", hbsObject);
		}).catch(function(err) {
			console.log(json(err));
		}); 
	});
};