import { connect } from 'react-redux';
import { Car } from '../../components/car/car';
import { SetCar ,DisplayMake} from '../../actions/car/car'
const mapStateToProps = state => ({
  makelist:state.carReducer.makelist
});
const mapDispatchToProps = {
    SetCar: SetCar,
    DisplayMake:DisplayMake,
  };

export default connect(mapStateToProps,mapDispatchToProps)(Car);
