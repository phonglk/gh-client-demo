import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import PageSearch from './containers/PageSearch';
import PageProfile from './containers/PageProfile';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search" component={PageSearch} />
            <Route path="/profile/:username" component={PageProfile} />
            <Redirect from="/" to="/search" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
