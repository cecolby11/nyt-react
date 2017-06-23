var React = require('react');

var Link = require('react-router').Link;

var Search = React.createClass({
  render: function() {
    return(
      <div className="container">
        <div className="search">
          <h3>Search NYT For Articles</h3>
          <form method="POST" action="api/query">
            <div className="form-group">
              <label for="queryTerm">Keyword(s)</label>
              <input className="form-control" type="text" id="queryTerm" name="queryTerm" required/>
            </div>
            <div className="form-group">
              <label for="beginYear">Start Year (optional)</label>
              <input className="form-control" type="text" name="beginYear" id="beginYear"/>
            </div>
            <div className="form-group">
              <label for="endYear">End Year (optional)</label>
              <input className="form-control" type="text" name="endYear" id="endYear"/>
            </div>
            <button type="submit" className="btn btn-default">Search</button>
          </form>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Search;