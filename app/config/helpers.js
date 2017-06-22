var axios = require('axios');

var helpers = {
  getArticles: function() {
    return axios.get('/api/saved').then(function(response) {
      return(response.data);
    });
  }
}

module.exports = helpers;