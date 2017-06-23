var React = require('react');

var Link = require('react-router').Link;

var Main = React.createClass({
  render: function() {
    return(
      <div className="container">
        <h1>Main.js! NYT</h1>
        <Link to='/Search'><button className="btn btn-default">Search</button></Link>
        <Link to='/Saved'><button className="btn btn-default">Saved</button></Link>
        <div>
          <h3>{this.props.children}</h3>
        </div>
      </div>
    )
  }
});

module.exports = Main;