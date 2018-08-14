import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase'

const set = (detail) => {
    return {
        type: types.SET,
        detail: detail,
    };
  };

const make = make => {
    return {
      type: types.MAKE,
      make
    }
  }




export const SetCar = (detail) => (
    dispatch => {
       dispatch(set(detail))
        }
    )

export const DisplayMake = () => dispatch => {
    firebaseService.database().ref('CarList').on('value', function (snapshot) {
        const carlist = snapshot.val()
        dispatch(make(carlist))
      }.bind(this), function (error) {
        console.log(error)
      })
      }
      


