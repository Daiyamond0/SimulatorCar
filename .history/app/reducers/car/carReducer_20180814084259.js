import * as types from '../../actions/car/actionTypes';
const initialState = {
    CarDetail:[],
    makelist:[],
    selectmake:undefined,
    }
  
    const carReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.SET:
          return { ...state, CarDetail : action.detail  }
        case types.MAKE:
          return { ...state, makelist : action.make  }
        case types.MAKE:
          return { ...state, selectmake : action.selectmake  }
            
         
          default: return state;
          
      }
      
    }
export default carReducer;