import { connect } from 'react-redux';
import { Car } from '../../components/car/car';
import { SetCar } from '../../actions/car/car'
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = {
    SetCar: SetCar,
   
  };

export default connect(mapStateToProps,mapDispatchToProps)(Car);
