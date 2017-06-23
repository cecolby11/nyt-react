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
  news_desk: {
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
    type: String // moment-formatted into string
  },
  url: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  saved: {
    type: Boolean,
    default: false
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
