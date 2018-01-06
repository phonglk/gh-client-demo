import { PROFILE } from '../actions';

export default function profile(state = {
  error: '',
  username: '',
  profile: null,
  followers: null,
  following: null,
  repos: null,
  isLoading: false,
}, action) {
  switch (action.type) {
    case PROFILE.REQUEST: {
      return {
        ...state,
        username: action.username,
        isLoading: true,
      }
    }
    case PROFILE.SUCCESS: {
      return {
        ...state,
        profile: action.profile,
        repos: action.repos,
        followers: action.followers,
        following: action.following,
        isLoading: false,
        error: '',
      }
    }
    case PROFILE.FAILURE: {
      return {
        ...state,
        isSearching: false,
        error: action.error,
        profile: null,
        repos: null,
        followers: null,
        following: null,
      }
    }
    default: return state;
  }
}