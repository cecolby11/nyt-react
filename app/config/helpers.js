var axios = require('axios');

var helpers = {
  getSaved: function() {
    return axios.get('/api/saved').then(function(response) {
      return(response.data);
    });
  }, 
  getResults: function() {
    return axios.get('/api/query').then(function(response) {
      return(response.data);
    });
  }
}

module.exports = helpers;