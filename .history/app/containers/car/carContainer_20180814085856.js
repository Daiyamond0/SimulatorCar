import { connect } from 'react-redux';
import { Car } from '../../components/car/car';
import { SetCar ,DisplayMake ,onValueChange,ModelSelect} from '../../actions/car/car'
const mapStateToProps = state => ({
  makelist:state.carReducer.makelist,
  selectmake:state.carReducer.selectmake,
  modellist:state.carReducer.modellist,
  selectmodel:state.carReducer.selectmodel,
  serielist:state.carReducer.serielist
});
const mapDispatchToProps = {
    SetCar: SetCar,
    DisplayMake:DisplayMake,
    onValueChange:onValueChange,
    ModelSelect:ModelSelect,

  };

export default connect(mapStateToProps,mapDispatchToProps)(Car);
