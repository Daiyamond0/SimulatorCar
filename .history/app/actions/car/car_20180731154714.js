import * as types from './actionTypes';


const set = (detail) => {
    return {
        type: types.SET,
        detail: detail,
    };
  };

   SetCar = (detail) => (
    dispatch => {
       dispatch(set(detail))
        }
    )

