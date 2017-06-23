var React = require('react');
var Results = require('./Results');
var helpers = require('../config/helpers');

var Search = React.createClass({
  getInitialState: function() {
    return({
      Results: []
    });
  },
  // get Articles (helper grabs from /api/saved using axios)
  handleSearch: function(event) {
    event.preventDefault();
    var that = this;
    helpers.getResults().then(function(results) {
      that.setState({Results: results});
    });
  },

  render: function() {
    return(
      <div className="container">
        <div className="search">
          <h3>Search NYT For Articles</h3>
          <form method="POST" action="api/query" onSubmit={this.handleSearch}>
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
          <Results Results={this.state.Results}/>
        </div>
      </div>
    )
  }
});

module.exports = Search;