import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { changePageRequest } from '../actions';

const RESULT_PER_PAGE = 30;

class SearchNavigation extends PureComponent {
  state = {}
  handlePageChange = (page, e) => {
    e.preventDefault();
    this.props.changePageRequest(page);
    return false;
  }
  render () {
    const { isSearching, result, totalCount } = this.props;
    if (totalCount <= 30) return null;
    const pagination = [];
    const pageCount = Math.ceil(totalCount / RESULT_PER_PAGE);
    const pageMax = Math.min(34, pageCount);
    for(let i = 1; i <= pageMax; i++) {
      pagination.push(
        <li className="search-navigation__item" key={i}>
          <a href="#" onClick={this.handlePageChange.bind(this, i)} className="search-navigation__item-link">{i}</a>
        </li>
      )
    }
    return (
      <div className="search-navigation">
        <ul>
          {pagination}
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return state.search; 
}, { changePageRequest })(SearchNavigation)