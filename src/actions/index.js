import { search, profile, user } from '../util/api';

// actionTypes section
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
  // util function
const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE]
    .reduce((acc, type) => ({
      ...acc,
      [type]: `${base}/${type}`
    }), {});

export const SEARCH = createRequestTypes('SEARCH');
export const SUGGESTION = createRequestTypes('SUGGESTION');
export const CHECK_FOLLOW = createRequestTypes('CHECK_FOLLOW');
export const PROFILE = createRequestTypes('PROFILE');
SUGGESTION.CANCEL = 'SUGGESTION/CANCEL';

// actions section 

// util function
const action = (type, payload = {}) => ({ type, ...payload });

// search page actions
export const searchRequest = (query, page = 1) => async (dispatch, getStore) => {
  if (typeof query === 'undefined' && page) {
    query = getStore().search.query;
  }
  dispatch(action(SEARCH[REQUEST], { query, page }));
  try {
    const { total_count: totalCount, items, errors, message } = await search(query, page);
    if (errors) {
      throw new Error(message);
    }
    dispatch(action(SEARCH[SUCCESS], { totalCount, items }));
  } catch (e) {
    dispatch(action(SEARCH[FAILURE], { error: e.message }));
  }
}

export const changePageRequest = (page) => searchRequest(undefined, page);

export const checkFollowRequest = (username) => async (dispatch, getStore) => {
  const { followInfos } = getStore().search;
  const extras = followInfos[username];
  if (extras) {
    dispatch(action(CHECK_FOLLOW[SUCCESS], { username, followers: extras.followers, following: extras.following }));
    return;
  }
  dispatch(action(CHECK_FOLLOW[REQUEST], { username }));
  try {
    const { followers, following } = await user(username);
    dispatch(action(CHECK_FOLLOW[SUCCESS], { username, followers, following }));
  } catch (e) {
    dispatch(action(CHECK_FOLLOW[FAILURE], { error: e.message }));
  }
}

export const suggestionRequest = (query) => async (dispatch) => {
  dispatch(action(SUGGESTION[REQUEST], { query}));
  try {
    const { items, errors, message } = await search(query);
    if (errors) {
      throw new Error(message);
    }
    dispatch(action(SUGGESTION[SUCCESS], { items }));
  } catch (e) {
    dispatch(action(SUGGESTION[FAILURE], { error: e.message }));
  }
}

export const cancelSuggestion = () => action(SUGGESTION.CANCEL);


// profile page actions

export const profileRequest = username => async (dispatch) => {
  dispatch(action(PROFILE[REQUEST], { username }));
  try {
    const data = await profile(username);
    dispatch(action(PROFILE[SUCCESS], data));
  } catch (e) {
    dispatch(action(PROFILE[FAILURE], { error: e.message }));
  }
}
