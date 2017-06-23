var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
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
    trim: true,
    required: true,
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
