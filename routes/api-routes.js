var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
	app.get("/scrape", function(req, res) {
		request.get("https://theonion.com", function(error, response, html) {
			var $ = cheerio.load(html)

			$(".headline").each(function(i, element){
				var result = {}
				result.title = $(this).children("a").text();
				result.link = $(this).children("a").attr("href");

				if (result.title && result.link) {
					db.Article.create(result).then(function(dbArticle){}).catch(function(err) {
						console.log(err);
					});
				}
			})
		})
	})

	app.post("/api/comment/:id", function(req, res) {
	db.Note.create(req.body)
		.then(function(dbNote) {
	  	// If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
	  	// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
	  	// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
	  	return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
	})
	.then(function(dbArticle) {
	  // If we were able to successfully update an Article, send it back to the client
	  res.json(dbArticle);
	})
	.catch(function(err) {
	  // If an error occurred, send it to the client
	  res.json(err);
	});
	})

	app.post("/api/ripe/:id", function(req, res) {
		db.Article.findByIdAndUpdate(
			req.params.id, { rank: 'ripe' }
		).catch(function(err) {
			console.log(err);
		});
	})

	app.post("/api/rancid/:id", function(req, res) {
		db.Article.findByIdAndUpdate(
			req.params.id, { rank: 'rancid' }
		).catch(function(err) {
			console.log(err);
		});
	})

	app.post("/api/delete/:id", function(req, res) {
		db.Articles.findByIdAndRemove(req.params.id);
	})

	app.post("/api/rancid/:id", function(req, res) {
		db.Ripe.create({ _id: req.params.id});
	})
}