import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searchRequest } from '../actions/index';
import Spinner from '../components/Spinner';

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
    this.props.history.push(`/search?q=${query}`);
    return false;
  }
  componentWillMount() {
    if (this.props.query != this.state.query) {
      this.setState({ query: this.props.query });
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.$input.focus();
      this.$input.select();
    }, 300);
  }
  render () {
    const { isSearching } = this.props;
    const { query } = this.state;
    return (
      <div className="search-input">
        <form onSubmit={this.handleFormSubmit} className="search-input__form">
          <div className="search-input__textbox-wrapper">
            <input 
              className="search-input__textbox"
              value={query}
              ref={(input) => this.$input = input}
              type="text" onChange={this.handleInputChange} placeholder="Search ..." disabled={isSearching} />
            {isSearching && <Spinner small />}
          </div>
          <button
            className="search-input__btn"
            type="submit" disabled={isSearching}><i className="fa fa-search" /></button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect((state) => {
  return state.search; 
}, {
  searchRequest
})(SearchInput));