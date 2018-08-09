import { combineReducers } from 'redux';

import routesReducer from '../reducers/routes/routesReducer';
import carReducer from '../reducers/car/carReducer';


export default combineReducers({
  routesReducer,
  carReducer
});
