var React = require('react');

var Link = require('react-router').Link;

var Main = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Main.js! NYT</h1>
        <Link to='/Search'><button>Search</button></Link>
        <Link to='/Saved'><button>Saved</button></Link>
        <div>
          <h3>{this.props.children}</h3>
        </div>
      </div>
    )
  }
});

module.exports = Main;