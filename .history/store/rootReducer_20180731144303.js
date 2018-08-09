import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import homeReducer from '../reducers/home/homeReducer';


export default combineReducers({
  routesReducer,
  // homeReducer
});
