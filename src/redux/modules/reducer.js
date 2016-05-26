import { combineReducers } from 'redux';
//import multireducer from 'multireducer';
import { routerReducer as routing } from 'react-router-redux';
//import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import counter from './counter';

export default combineReducers({
  routing,
  counter
});