import { combineReducers } from 'redux';

import search from './search';
import profile from './profile';

export default combineReducers({ search, profile });