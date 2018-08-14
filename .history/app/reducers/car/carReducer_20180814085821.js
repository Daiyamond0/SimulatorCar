import * as types from '../../actions/car/actionTypes';
const initialState = {
    CarDetail:[],
    makelist:[],
    selectmake:undefined,
    modellist: [],
    selectmodel:undefined,
    serielist:[],
    }
  
    const carReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.SET:
          return { ...state, CarDetail : action.detail  }
        case types.MAKE:
          return { ...state, makelist : action.make  }
        case types.MAKE:
          return { ...state, selectmake : action.selectmake  }
        case types.MODELLIST:
          return { ...state, modellist : action.modellist  }
        case types.SELECTMODEL:
          return { ...state, selectmodel : action.selectmodel  }
        case types.SERIELIST:
          return { ...state, serielist : action.serielist  }
         
          default: return state;
          
      }
      
    }
export default carReducer;