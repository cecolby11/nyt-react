// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var methodOverride = require('method-override');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 5000;

// Morgan for logging 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride("_method"));
// serve static files from public directory
app.use(express.static('./public'));

// mongoose setup
// mongoose.connect('mongodb://localhost/nytreact');
mongoose.connect('mongodb://heroku_21c08cb1:qf9ttk04ngegrq1emg333ne35s@ds135522.mlab.com:35522/heroku_21c08cb1'); //mongolab heroku addon 
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('mongoose error: ', err);
});
db.once('open', function() {
  console.log('mongoose connection successful');
});

// routes

// GET: for querying mongodb
app.get('/api/saved', function(req, res) {
  Article.find({}, function(error,doc) {
    if(error) {
      res.send(error);
    } else {
      res.send(doc);
    }
  });
});

// POST: for saving an article
app.post('/api/saved', function(req, res) {
  var article = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    date: req.body.date,
    snippet: req.body.snippet,
    news_desk: req.body.news_desk
  }
  var newArticle = new Article(article);
  newArticle.save(function(err, doc) {
    if(err) {
      res.send(err);
    } else {
      console.log('new article added to db!');
      res.redirect('/search#/Saved');
    }
  });
}); 

// DELETE: delete a saved article
app.delete('/api/saved/', function(req, res) {
  var articleId = req.body.articleId;
  Article.findByIdAndRemove(articleId, function(error, doc) {
    if(error) {
      res.send(error);
    } else {
      res.redirect('/saved#/Saved')
    }
  });
});

// GET: main route, redirects to rendered react application
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
  console.log('App listening');
});
