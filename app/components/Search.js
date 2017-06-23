var React = require('react');
var Results = require('./Results');
var helpers = require('../utils/helpers');

var Search = React.createClass({
  getInitialState: function() {
    return({
      queryTerm: '',
      beginYear: '',
      endYear: '',
      Results: []
    });
  },

  updateQuery: function(event) {
    var newState = {}
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // get Articles (helper grabs from /api/saved using axios)
  getResults: function(event) {
    event.preventDefault();
    var that = this;
    var newQuery = {
      queryTerm: this.state.queryTerm,
      beginYear: this.state.beginYear,
      endYear: this.state.endYear
    }
    helpers.getResults(newQuery).then(function(results) {
      that.setState({Results: results});
    });
  },

  render: function() {
    return(
      <div className="container">
        <div className="search">
          <h3>Search NYT For Articles</h3>
          <form onSubmit={this.getResults}>
            <div className="form-group">
              <label for="queryTerm">Keyword(s)</label>
              <input className="form-control" type="text" id="queryTerm" name="queryTerm" required onChange={this.updateQuery}/>
            </div>
            <div className="form-group">
              <label for="beginYear">Start Year (optional)</label>
              <input className="form-control" type="text" name="beginYear" id="beginYear" onChange={this.updateQuery}/>
            </div>
            <div className="form-group">
              <label for="endYear">End Year (optional)</label>
              <input className="form-control" type="text" name="endYear" id="endYear" onChange={this.updateQuery}/>
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