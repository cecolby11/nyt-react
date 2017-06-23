// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var methodOverride = require('method-override');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 3000;

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
mongoose.connect('mongodb://localhost/nytreact');
var db = mongoose.connection;
db.on('error', function(err) {
  console.log('mongoose error: ', err);
});
db.once('open', function() {
  console.log('mongoose connection successful');
});

// routes
// POST: NYT API query using request
app.post('/api/query', function(req, res) {
  // clear out unsaved articles from last search 
  Article.remove({'saved':false}, function(error, doc) {
    if(error) {
      console.log(error);
    } else {
      // 
    }
  })

  var apiKey = 'b0a8918d8a0742a5882fc8da181a0921';
  var queryTerm = req.body.queryTerm;
  // searches for YYYYMMDD
  if(req.body.beginYear) {
    var beginDate = '&begin_date=' + req.body.beginYear + '0101';
  } else {
    var beginDate = ''
  }
  if(req.body.endYear) {
    var endDate = '&end_date=' + req.body.endYear + '1231';
  } else {
    endDate = ''
  }
  var searchUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=' + queryTerm + beginDate + endDate;
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
          news_desk: results[i].news_desk,
          author: results[i].byline.original,
          date: results[i].pub_date,
          url: results[i].web_url,
          snippet: results[i].snippet
        }
        articles.push(article);
        // add to database as unsaved article
        var newArticle = new Article(article);
        newArticle.save(function(err, doc) {
          if(err) {
            res.send(err);
          } else {
            console.log('new article added to db!');
          }
        });
      }
      // res.send(articles);
      res.redirect('/');
    }
  });
});

// GET: for querying unsaved articles
app.get('/api/query', function(req, res) {
  Article.find({'saved':false}, function(error, doc) {
    if(error) {
      res.send(error);
    } else {
      res.send(doc);
    }
  })
})

// GET: for querying mongodb
app.get('/api/saved', function(req, res) {
  Article.find({'saved':true}, function(error,doc) {
    if(error) {
      res.send(error);
    } else {
      res.send(doc);
    }
  });
});

// PUT: for saving an article
app.put('/api/saved', function(req, res) {
  var articleId = req.body.articleId;
  console.log(articleId);
  
  Article.findOneAndUpdate({'_id': articleId}, {'saved':true}, function(error, doc) {
    if(error) {
      res.send(error);
    } else {
      res.redirect('/search#/Saved');
    }
  })
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

// TODO
// remove API key from NYT query 
// don't add duplicates to db
// make sure years are optional in queryURL
// validation for years in search