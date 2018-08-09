import * as types from '../../actions/car/actionTypes';
const initialState = {
    CarDetail:[]
    }
  
    const carReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.SET:
          return { ...state, CarDetail : action.detail  }
          
         
          default: return state;
          
      }
      
    }
export default carReducer;