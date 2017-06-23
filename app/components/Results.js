var React = require('react');

var Results = React.createClass({
  getInitialState: function() {
    return {Results: []}
  },

  // // get Articles (helper grabs from /api/saved using axios)
  // componentDidMount: function() {
  //   var that = this;
  //   helpers.getResults().then(function(results) {
  //     that.setState({Results: results});
  //     console.log('!!!!!!!');
  //     console.log(results);
  //   });
  // },

  render: function() {
    return(
      <div>
        <h3>Search Results</h3>
        <ul>{this.props.Results.map(function(article) {
          return <li className="thumbnail" key={article._id}>
            <h4>{article.title} | <span className="article-author">{article.author}</span></h4>
           <a target="_blank" href={article.url} className="btn btn-info">View on NYT</a>
           <form method="POST" action="/api/saved?_method=PUT">
            <input name="articleId" type="hidden" value={article._id}/>
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