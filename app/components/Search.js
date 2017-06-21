var React = require('react');

var Link = require('react-router').Link;

var Search = React.createClass({
  render: function() {
    return(
      <div>
        <h3>Search!</h3>
        <Link to ='/Results'><button>View Results</button></Link>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Search;