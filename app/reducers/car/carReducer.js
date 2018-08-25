import * as types from '../../actions/car/actionTypes';
const initialState = {
    CarDetail:[],
    makelist:[],
    selectmake:undefined,
    modellist: [],
    selectmodel:undefined,
    serielist:[],
    selectserie:undefined,

    }
  
    const carReducer = (state = initialState, action) => {
      switch (action.type) {
        case types.SET:
          return { ...state, CarDetail : action.detail  }
        case types.MAKE:
          return { ...state, makelist : action.make  }
        case types.SELECTMAKE:
          return { ...state, selectmake : action.selectmake  }
        case types.MODELLIST:
          return { ...state, modellist : action.modellist  }
        case types.SELECTMODEL:
          return { ...state, selectmodel : action.selectmodel  }
        case types.SERIELIST:
          return { ...state, serielist : action.serielist  }
        case types.SELECTSERIE:
          return { ...state, selectserie : action.selectserie  }
        case types.RESETSELECTMAKE:
          return { ...state,  selectmake:undefined,modellist: [],selectmodel:undefined}
          case types.RESETSELECTSERIE:
          return { ...state,  selectmodel:undefined, serielist:[], selectserie:undefined}  

          default: return state;
          
      }
      
    }
export default carReducer;