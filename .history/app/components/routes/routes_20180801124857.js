import React, {Component} from 'react';
import { styles } from './styles';
import { Scene, Actions } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import homeContainer from '../../containers/home/homeContainer';
import carContainer from '../../containers/car/carContainer';
import startContainer from '../../containers/start/startContainer';

import { RouterRedux } from '../../containers/routes/routesContainer';
import { configureStore } from '../../store/store';

const store = configureStore();

export class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux navigationBarStyle={styles.navBar} tintColor='#ffffff' titleStyle={styles.barButtonTextStyle}>
          <Scene key="root">
           
            <Scene key="home" component={homeContainer} title="Home" hideNavBar='true'/>
            <Scene key="car" component={carContainer} title="Car" hideNavBar='true'/>
            <Scene key="startcar" component={startContainer} title="Start" hideNavBar='true'/>
            
          </Scene>
        </RouterRedux>
      </ Provider>
    );
  }
}
 