import React from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'qs';

import PageSearch from '../components/PageSearch';
import { searchRequest } from '../actions';

class ConPageSearch extends PageSearch {
  handlePropsChanging(props) {
    const queryParams = parse(props.location.search.slice(1));
    const query = queryParams.q;
    const page = parseInt(queryParams.page || 1);
    if (typeof query !== "undefined" 
      && (query !== this.props.query || page !== this.props.currentPage )) {
      this.props.searchRequest(query, page);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.handlePropsChanging(nextProps)
  }
  componentWillMount() {
    this.handlePropsChanging(this.props);
  }
}

export default connect((state) => {
  return state.search; 
}, {
  searchRequest
})(ConPageSearch)