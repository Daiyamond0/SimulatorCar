import { connect } from 'react-redux';
import { Start } from '../../components/start/start';

const mapStateToProps = state => ({
    CarDetail:state.carReducer.CarDetail,
});

export default connect(mapStateToProps)(Start);
