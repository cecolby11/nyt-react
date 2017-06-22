var React = require('react');
var helpers = require('../config/helpers');

var Link = require('react-router').Link;

var Saved = React.createClass({
  getInitialState: function() {
    return {Articles: []}
  },

  // displaly Articles on load (helper grabs from /api/saved using axios)
  componentDidMount: function() {
    var that = this;
    helpers.getArticles().then(function(articles) {
      that.setState({Articles: articles})
    });
  }, 

  render: function() {
    return(
      <div>
        <h3>Saved!</h3>
        <p>{this.state.Articles}</p>
      </div>
    )
  }
});

module.exports = Saved;