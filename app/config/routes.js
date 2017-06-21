// Dependencies
var React = require('react');
var router = require('react-router');

// route module to display individual routes
var Route = router.Route;
// router module to contain invidual routes
var Router = router.Router;

// to go back in react routes
var hashHistory = router.hashHistory;
// default route at the route
var IndexRoute = router.IndexRoute;
// reference components 
var Main = require('../components/Main');
var Search = require('../components/Search');
var Saved = require('../components/Saved');
var Results = require('../components/Results');

// export the routes
module.exports = (
  <Router history = {hashHistory}>
    <Route path = '/' component = {Main}>
      <Route path = '/Search' component = {Search}>
        <Route path = '/Results' component = {Results}/>
        <IndexRoute component = {Results}/>
      </Route>
      <Route path = '/Saved' component = {Saved}/>
    </Route>
  </Router>
); 