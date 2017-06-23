var axios = require('axios');

var helpers = {
  getSaved: function() {
    return axios.get('/api/saved').then(function(response) {
      return(response.data);
    });
  }, 

  getResults: function() {
    console.log('HEREEEEE');
    return axios.get('/api/query').then(function(response) {
      return(response.data);
    });
  }
}

module.exports = helpers;