var axios = require('axios');
var moment = require('moment');

var helpers = {
  getSaved: function() {
    return axios.get('/api/saved').then(function(response) {
      return(response.data);
    });
  }, 

  getResults: function(userQuery) {
    var articles = [];
    var apiKey = 'b0a8918d8a0742a5882fc8da181a0921';
    var queryTerm = userQuery.queryTerm;
    if (userQuery.beginYear !== '') {
      var beginDate = '&begin_date=' + queryTerm.beginYear + '0101';
    } else {
      var beginDate = ''
    }
    if (userQuery.endYear !== '') {
      var endDate = '&end_date' + queryTerm.endYear + '1231';
    } else {
      var endDate = ''
    }

    // searches for YYYYMMDD
    var searchUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=' + queryTerm + beginDate + endDate;
    return axios.get(searchUrl).then(function(response) {
      var results = response.data.response.docs;// go through results and pull out relevant info
      for(var i = 0; i < results.length; i++) {
        var date = results[i].pub_date;
        var moment_date = moment(date).format('MMMM Do YYYY, h:mm a'); 
        var article = {
          title: results[i].headline.main,
          news_desk: results[i].news_desk,
          author: results[i].byline.original,
          date: moment_date,
          url: results[i].web_url,
          snippet: results[i].snippet
        }
        articles.push(article);
      }
      return articles;
    });
  }
}

module.exports = helpers;