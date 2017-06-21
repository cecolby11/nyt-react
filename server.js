// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var Click = require('./models/Article.js');

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
// GET: for querying mongodb
app.get('/api/saved', function(req, res) {
  // TODO
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



