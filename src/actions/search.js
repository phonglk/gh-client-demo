import { search } from '../util/api';

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
export const USER = createRequestTypes('USER');

// actions section 
  // util function
const action = (type, payload = {}) => ({ type, ...payload });

export const searchRequest = query => dispatch => {
  dipsatch(action(SEARCH[REQUEST], { query }));
  try {
    // const { total_count: totalCount, items } = await search(query);
  } catch (e) {

  }
}