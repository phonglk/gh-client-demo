import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Bundle from './components/Bundle';
import loadPageSearch from 'bundle-loader?lazy!./containers/PageSearch';
import loadPageProfile from 'bundle-loader?lazy!./containers/PageProfile';

const PageSearch = (props) => (
  <Bundle load={loadPageSearch}>
    {(PageSearch) => <PageSearch {...props}/>}
  </Bundle>
)

const PageProfile = (props) => (
  <Bundle load={loadPageProfile}>
    {(PageProfile) => <PageProfile {...props}/>}
  </Bundle>
)

class App extends Component {
  componentDidMount() {
    // preloads the rest
    loadPageSearch(() => {})
    loadPageProfile(() => {})
  }

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
