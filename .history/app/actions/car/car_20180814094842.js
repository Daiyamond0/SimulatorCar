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

const modellist = (modellist) =>{
    return {
        type: types.MODELLIST,
        modellist
      }
}

const selectmodel = (selectmodel) =>{
    return {
        type: types.SELECTMODEL,
        selectmodel
      }
}

const serielist = (serielist) =>{
    return {
        type: types.SERIELIST,
        serielist
      }
}

const selectserie = (selectserie) =>{
    return {
        type: types.SELECTSERIE,
        selectserie
      }
}



export const SetCar = (detail) => (
    dispatch => {
       dispatch(set(detail))
        }
    )

    /// เข้ามาหน้านี้จะแสดง makecar ก่อน
export const DisplayMake = () => dispatch => {
    firebaseService.database().ref('CarList').on('value', function (snapshot) {
        const carlist = snapshot.val()
        dispatch(make(carlist))
      }.bind(this), function (error) {
        console.log(error)
      })
      }

  ///////// เลือก make แล้วจะเอา make ไปหา model ของ make ที่เลือก
 export const onValueChange = (value) => dispatch => {
       dispatch(selectmake(value))
        const make = value
        firebaseService.database().ref(`/CarList/${make}`).on('value', function (
          snapshot
        ) {
          const model = snapshot.val()
          dispatch(modellist(model))
        }.bind(this), function (error) {
          console.log(error)
        })
}
////////  เลือก model แล้วจะเอา model ไปหา series
export const ModelSelect = (make,model) => dispatch => {
    dispatch(selectmodel(model))
    firebaseService
      .database()
      .ref(`CarList/${make}/${model}`)
      .on(
        'value',
        function (snapshot) {
          const serie = snapshot.val()
          dispatch(serielist(serie))
        }.bind(this),
        function (error) {
          console.log(error)
        }
      )
   }
 ////////// setcar series ไว้ที่่ state
   export const SerieSelect = (value) => dispatch => {
   
    dispatch(selectserie(value))
   }




