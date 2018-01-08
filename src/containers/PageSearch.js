import React from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'qs';

import PageSearch from '../components/PageSearch';
import { searchRequest, checkFollowRequest } from '../actions';

class ConPageSearch extends PageSearch {
  handlePropsChanging(props) {
    const queryParams = parse(props.location.search.slice(1));
    const query = queryParams.q;
    const page = parseInt(queryParams.page || 1);
    if (typeof query !== "undefined" 
      && (query !== props.query || page !== props.currentPage )) {
      props.searchRequest(query, page);
    }
    if (props.followRequestQueue.length > 0 
      && props.followRequestingId === null) {
        props.checkFollowRequest(props.followRequestQueue[0]);
      }
  }
  componentDidUpdate(prevProps) {
    this.handlePropsChanging(this.props)
  }
  componentWillMount() {
    this.handlePropsChanging(this.props);
  }
}

export default connect((state) => {
  return state.search; 
}, {
  searchRequest,
  checkFollowRequest
})(ConPageSearch)