import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserList from '../components/UserList';

class SearchResult extends PureComponent {
  state = {}
  render () {
    const { isSearching, result, extraLoadingUsername, suggestionMode, suggestions, isLoadingSuggestion } = this.props;
    const items = suggestionMode ? suggestions.slice(0, 5) : result;
    const isLoading = suggestionMode ? isLoadingSuggestion : isSearching;
    const extras = suggestionMode ? false : true;
    const title = suggestionMode ? 'Suggestion (Top 5)' : 'Result';
    return (
      <div className="search-result">
        { (suggestionMode || items !== null) && <h3>{title}</h3> }
        <UserList
          isLoading={isLoading}
          items={items}
          emptyMessage="There is no user match given search term"
          extras={extras}
          extraLoadingUsername= {extraLoadingUsername}
        />
      </div>
    )
  }
}

export default connect((state) => {
  return {
    ...state.search,
    extraLoadingUsername: state.search.followRequestingId,
    result: state.search.result !== null ? state.search.result.map(item => {
      const extras = state.search.followInfos[item.login];
      if (extras) {
        return {
          ...item,
          extras,
        }
      } else {
        return item;
      }
    }) : null
  }; 
})(SearchResult)