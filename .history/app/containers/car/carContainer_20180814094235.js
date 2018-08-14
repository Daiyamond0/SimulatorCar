import { connect } from 'react-redux';
import { Car } from '../../components/car/car';
import { SetCar ,DisplayMake ,onValueChange,ModelSelect,SerieSelect} from '../../actions/car/car'
const mapStateToProps = state => ({
  makelist:state.carReducer.makelist,
  selectmake:state.carReducer.selectmake,
  modellist:state.carReducer.modellist,
  selectmodel:state.carReducer.selectmodel,
  serielist:state.carReducer.serielist,
  selectserie:state.carReducer.selectserie,

});
const mapDispatchToProps = {
    SetCar: SetCar,
    DisplayMake:DisplayMake,
    onValueChange:onValueChange,
    ModelSelect:ModelSelect,
    SerieSelect:SerieSelect,
  };

export default connect(mapStateToProps,mapDispatchToProps)(Car);
