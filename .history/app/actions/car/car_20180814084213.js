import * as types from './actionTypes';
import firebaseService from '../../enviroments/firebase'

const set = (detail) => {
    return {
        type: types.SET,
        detail: detail,
    };
  };

const make = (make) => {
    return {
      type: types.MAKE,
      make
    }
  }

const selectmake = (selectmake) =>{
    return {
        type: types.SELECTMAKE,
        selectmake
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


 export const onValueChange = (value) => dispatch => {
       dispatch(selectmake(value))
        const make = value
        firebaseService.database().ref(`/CarList/${make}`).on('value', function (
          snapshot
        ) {
          const modellist = snapshot.val()
          this.setState({ modellist: modellist })
        }.bind(this), function (error) {
          console.log(error)
        })
      }
      


