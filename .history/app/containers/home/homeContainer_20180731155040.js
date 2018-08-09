import { connect } from 'react-redux';
import { Home } from '../../components/home/home';

const mapStateToProps = state => ({
    CarDetail:state.carReducer.CarDetail,
});

export default connect(mapStateToProps)(Home);
