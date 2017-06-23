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
        <ul>{this.state.Articles.map(function(article) {
          return <li className="thumbnail" key={article._id}>
          <h4>{article.title} | <span className="article-author">{article.author}</span></h4>
          <a target="_blank" href={article.url} className="btn btn-info">View on NYT</a>
          <form method="POST" action="/api/saved?_method=DELETE">
            <input name="articleId" type="hidden" value={article._id}/>
            <button type="submit" className="btn btn-default">Remove from Saved</button>
          </form>
          </li>
        })}</ul>
      </div>
    )
  }
});

module.exports = Saved;
