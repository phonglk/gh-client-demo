import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { changePageRequest } from '../actions';

const RESULT_PER_PAGE = 30;

class SearchNavigation extends PureComponent {
  state = {}
  // handlePageChange = (page, e) => {
  //   e.preventDefault();
  //   this.props.changePageRequest(page);
  //   return false;
  // }
  render () {
    const { isSearching, result, totalCount, currentPage, query } = this.props;
    if (totalCount <= 30) return null;
    const pagination = [];
    const pageCount = Math.ceil(totalCount / RESULT_PER_PAGE);
    const pageMax = Math.min(34, pageCount);

    if (currentPage > 1) {
      if (currentPage > 2) {
        pagination.push({ i: 1, element: <i className="fa fa-step-backward" /> })
      }
      pagination.push({ i: currentPage - 1, element: <i className="fa fa-backward " /> })
    }

    pagination.push({ i: currentPage })

    if (currentPage < pageMax) {
      pagination.push({ i: currentPage + 1, element: <i className="fa fa-forward " /> })
      if (currentPage < pageMax - 1) {
        pagination.push({ i: pageMax, element: <i className="fa fa-step-forward " /> })
      }
    }

    // for(let i = 1; i <= pageMax; i++) {
    //   pagination.push(
    //     <li className="search-navigation__item" key={i}>
    //       <a href="#" onClick={this.handlePageChange.bind(this, i)} className="search-navigation__item-link">{i}</a>
    //     </li>
    //   )
    // }
    return (
      <div className="search-navigation">
        <ul>
          {pagination.map(page => (
            <li className="search-navigation__item" key={page.i}>
              {page.i === currentPage 
                ? <a href="javascript:void(0)" className="search-navigation__item-link search-navigation__item-link_current">{currentPage}</a>
                : <Link to={`/search?q=${query}&page=${page.i}`} className="search-navigation__item-link">{page.element}</Link>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return state.search; 
}, { changePageRequest })(SearchNavigation)