import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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
    console.log(query)
    return false;
  }
  render () {
    return (
      <div className="search-input">
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" onChange={this.handleInputChange} placeholder="Search ..." />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchInput