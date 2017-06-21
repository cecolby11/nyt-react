var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true, 
  }, 
  author: {
    type: String,
    trim: true,
    required: false
  },
  snippet: {
    type: String,
    trim: true,
    required: false
  },
  date: {
    type: Date
  }, 
  url: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
