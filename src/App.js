import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import Search from './Components/Search/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
       <Switch>
       <Route exact path="/" component={Dashboard}/>
       <Route path="/search" component={Search}/>
       </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
