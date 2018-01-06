import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse, stringify } from 'qs';

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
  handlePropsChanging(props) {
    const query = parse(props.location.search.slice(1)).q;
    if (typeof query !== "undefined" && query !== this.props.query) {
      this.setState({ query });
      this.props.searchRequest(query);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.handlePropsChanging(nextProps)
  }
  componentWillMount() {
    this.handlePropsChanging(this.props);
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