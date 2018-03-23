var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
  	type: String,
  	unique: true,
  	required: "Title is required"
  },
  link: {
  	type: String,
  	required: "Link is required"
  },
  rank: {
  	type: String,
  	default: "nothing"
  },
  notes: [
	{
		// Store ObjectIds in the array
		type: Schema.Types.ObjectId,
		// The ObjectIds will refer to the ids in the Note model
		ref: "Note"
	}
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Book model
module.exports = Article;