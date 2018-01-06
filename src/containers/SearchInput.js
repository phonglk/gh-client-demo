import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { searchRequest } from '../actions/index';

class SearchInput extends PureComponent {
  state = {
    query: '',
  }
  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    console.log(query);
    this.props.searchRequest(query);
    return false;
  }
  render () {
    const { isSearching } = this.props;
    return (
      <div className="search-input">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleInputChange} placeholder="Search ..." disabled={isSearching} />
          <button type="submit" disabled={isSearching}>Search</button>
        </form>
      </div>
    )
  }
}

export default connect((state) => {
  return state.search; 
}, {
  searchRequest
})(SearchInput)