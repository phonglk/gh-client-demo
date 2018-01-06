import { search, profile } from '../util/api';

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
export const CHECK_FOLLOW = createRequestTypes('CHECK_FOLLOW');
export const PROFILE = createRequestTypes('PROFILE');

// actions section 

// util function
const action = (type, payload = {}) => ({ type, ...payload });

// search page actions
export const searchRequest = (query, page) => async (dispatch, getStore) => {
  if (typeof query === 'undefined' && page) {
    query = getStore().search.query;
  }
  dispatch(action(SEARCH[REQUEST], { query }));
  try {
    const { total_count: totalCount, items } = await search(query, page);
    dispatch(action(SEARCH[SUCCESS], { totalCount, items }));
  } catch (e) {
    dispatch(action(SEARCH[FAILURE], { error: e.message }));
  }
}

export const changePageRequest = (page) => searchRequest(undefined, page);

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
