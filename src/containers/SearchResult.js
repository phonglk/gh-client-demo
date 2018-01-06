import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserList from '../components/UserList';

class SearchResult extends PureComponent {
  state = {}
  render () {
    const { isSearching, result } = this.props;
    return (
      <div className="search-result">
        <UserList
          isLoadind={isSearching}
          items={result}
          emptyMessage="There is no user match given search term"
        />
      </div>
    )
  }
}

export default connect((state) => {
  return state.search; 
})(SearchResult)