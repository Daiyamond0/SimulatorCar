import * as types from '../../actions/car/actionTypes';
const initialState = {
    CarDetail:[],
    makelist:[],
    }
  
    const carReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.SET:
          return { ...state, CarDetail : action.detail  }
        case types.MAKE:
          return { ...state, makelist : action.make  }
         
          default: return state;
          
      }
      
    }
export default carReducer;