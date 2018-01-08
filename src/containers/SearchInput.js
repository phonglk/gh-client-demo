import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { searchRequest, suggestionRequest, cancelSuggestion } from '../actions/index';
import Spinner from '../components/Spinner';

class SearchInput extends PureComponent {
  state = {
    query: '',
  }
  handleSuggestion = () => {
    const { query } = this.state;
    this.props.suggestionRequest(query);
  }
  handleSuggestionDebounce = debounce(this.handleSuggestion, 300)
  handleCancelSuggestion = (e) => {
    if (this.props.suggestionMode) {
      this.props.cancelSuggestion();
    }
  }
  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleFormSubmit(e);
    } else if (e.keyCode === 27) {
      this.handleCancelSuggestion();
    }
  }
  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
    this.handleSuggestionDebounce();
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    this.props.history.push(`/search?q=${query}`);
    return false;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.suggestionMode !== this.props.suggestionMode 
      && this.state.query !== this.props.query
      && this.props.suggestionMode === false) {
      this.setState({ query: this.props.query });
    }
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
    const { isSearching, isLoadingSuggestion, suggestionMode  } = this.props;
    const { query } = this.state;
    return (
      <div className="search-input">
        <form onSubmit={this.handleFormSubmit} className="search-input__form">
          <div className="search-input__textbox-wrapper">
            <input 
              className="search-input__textbox"
              value={query}
              ref={(input) => this.$input = input}
              onKeyUp={this.handleKeyUp}
              type="text" onChange={this.handleInputChange} placeholder="Search ..." disabled={isSearching} />
            {(isSearching || isLoadingSuggestion) && <Spinner small />}
          </div>
          {suggestionMode && <a
            className="search-input__btn search-input__btn-cancel"
            onClick={this.handleCancelSuggestion}
          ><i className="fa fa-close" /></a> }
          <button
            className="search-input__btn search-input__btn-submit"
            type="submit" disabled={isSearching}><i className="fa fa-search" /></button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect((state) => {
  return state.search; 
}, {
  searchRequest,
  suggestionRequest,
  cancelSuggestion,
})(SearchInput));