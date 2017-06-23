var React = require('react');

var Results = React.createClass({
  getInitialState: function() {
    return {Results: []}
  },

  render: function() {
    return(
      <div>
        <h3>Search Results</h3>
        <ul>{this.props.Results.map(function(article) {
          return <li className="thumbnail" key={article.url}>
            <h4>{article.title} | <span className="article-author">{article.author}</span> on {article.date}</h4>
           <a target="_blank" href={article.url} className="btn btn-info pull-right">View on NYT</a>
           <form method="POST" action="/api/saved">
            <input type="hidden" name="title" value={article.title}/>
            <input type="hidden" name="author" value={article.author}/>
            <input type="hidden" name="date" value={article.date}/>
            <input type="hidden" name="url" value={article.url}/>
            <input type="hidden" name="news_desk" value={article.news_desk}/>
            <input type="hidden" name="snippet" value={article.snippet}/>
            <button className="btn btn-default" type="submit">Save Article</button>
           </form>
          </li>
        })}
        </ul>
      </div>
    )
  }
});

module.exports = Results;