import { SEARCH, CHECK_FOLLOW, SUGGESTION } from '../actions/index';

export default function search(state = {
  result: null,
  currentPage: 1,
  query: '',
  error: '',
  totalCount: 0,
  isSearching: false,
  followInfos: {},
  followRequestQueue: [],
  followRequestQueueWait: [],
  followRequestingId: null,
  suggestionMode: false,
  suggestions: [],
  isLoadingSuggestion: false,
}, action) {
  switch (action.type) {
    case SEARCH.REQUEST: {
      return {
        ...state,
        suggestionMode: false,
        query: action.query,
        isSearching: true,
        currentPage: action.page
      }
    }
    case SEARCH.SUCCESS: {
      return {
        ...state,
        result: action.items,
        followRequestQueue: action.items.map(user => user.login),
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
    case CHECK_FOLLOW.REQUEST: {
      return {
        ...state,
        followRequestingId: action.username,
      }
    }
    case CHECK_FOLLOW.SUCCESS: {
      return {
        ...state,
        followRequestingId: null,
        followRequestQueue: state.followRequestQueue.filter(username => username !== action.username),
        followInfos: {
          ...state.followInfos,
          [action.username]: {
            followers: action.followers,
            following: action.following,
          }
        }
      }
    }
    case CHECK_FOLLOW.FAILURE: { 
      return {
        ...state,
        followRequestingId: null,
        followInfos: {
          ...state.followInfos,
          [action.username]: false
        }
      }
    }
    case SUGGESTION.REQUEST: {
      return {
        ...state,
        suggestionMode: true,
        followRequestQueue: [],
        followRequestQueueWait: state.followRequestQueue,
        followRequestingId: null,
        isLoadingSuggestion: true,
      }
    }
    case SUGGESTION.CANCEL: {
      return {
        ...state, suggestionMode: false,
        followRequestQueue: state.followRequestQueueWait,
        followRequestQueueWait: [],
        isLoadingSuggestion: false,
      }
    }
    case SUGGESTION.SUCCESS: {
      return {
        ...state,
        suggestions: action.items,
        isLoadingSuggestion: false,
      }
    }
    case SUGGESTION.FAILURE: {
      return {
        ...state,
        isLoadingSuggestion: false,
      }
    }
    default: return state;
  }
}