import React, { PureComponent } from 'react';
import SearchInput from '../containers/SearchInput';
import SearchResult from '../containers/SearchResult';
import SearchNavigation from '../containers/SearchNavigation';

class PageSearch extends PureComponent {
  render () {
    return (
      <div className="page page-search">
        <h1>Search Github Profile</h1>
        <div>
          <SearchInput />
          <SearchResult />
          <SearchNavigation />
        </div>
      </div>
    )
  }
}

export default PageSearch