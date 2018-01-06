import { SEARCH } from '../actions/index';

export default function search(state = {
  result: null,
  currentPage: 1,
  query: '',
  error: '',
  totalCount: 0,
  isSearching: false,
}, action) {
  switch (action.type) {
    case SEARCH.REQUEST: {
      return {
        ...state,
        query: action.query,
        isSearching: true,
      }
    }
    case SEARCH.SUCCESS: {
      return {
        ...state,
        result: action.items,
        totalCount: action.totalCount,
        isSearching: false,
        error: '',
      }
    }
    case SEARCH.FAILURE: {
      return {
        ...state,
        result: [],
        totalCount: 0,
        isSearching: false,
        error: action.error,
      }
    }
    default: return state;
  }
}