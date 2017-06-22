// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 3000;

// Morgan for logging 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// serve static files from public directory
app.use(express.static('./public'));

// mongoose setup
mongoose.connect('mongodb://localhost/nytreact');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('mongoose error: ', err);
});
db.once('open', function() {
  console.log('mongoose connection successful');
});

// routes
app.get('/api/query', function(req, res) {
  var apiKey = 'b0a8918d8a0742a5882fc8da181a0921';
  var queryTerm = 'trump';
  // searches for YYYYMMDD
  var beginDate = 2016 + '0101';
  var endDate = 2017 + '1231';
  var searchUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=' + queryTerm + '&begin_date=' + beginDate + '&end_date=' + endDate;
  request(searchUrl, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      var results = JSON.parse(body).response.docs;
      var articles = [];
      // go through results and pull out relevant info
      for(var i = 0; i < results.length; i++) {
        var article = {
          title: results[i].headline.main,
          author: results[i].news_desk,
          date: results[i].pub_date,
          url: results[i].web_url,
          snippet: results[i].snippet
        }
        articles.push(article);
        // add to database
        var newArticle = new Article(article);
        newArticle.save(function(err, doc) {
          if(err) {
            res.send(err);
          } else {
            console.log('new article added to db!');
          }
        });
      }
      res.send(articles);
    }
  })
})
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
  // TODO
}); 

// DELETE: delete a saved article
app.delete('/api/saved', function(req, res) {
  // TODO
});

// GET: main route, redirects to rendered react application
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
  console.log('App listening');
});

// TODO
// remove API key from NYT query 
// don't add duplicates to db