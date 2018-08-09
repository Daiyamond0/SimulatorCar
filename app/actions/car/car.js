import * as types from './actionTypes';


const set = (detail) => {
    return {
        type: types.SET,
        detail: detail,
    };
  };

  export const SetCar = (detail) => (
    dispatch => {
       dispatch(set(detail))
        }
    )

