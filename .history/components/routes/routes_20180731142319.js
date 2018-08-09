import React, {Component} from 'react';
import { styles } from './styles';
import { Scene, Actions } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';


import SessionContainer from '../../containers/session/sessionContainer';


import { RouterRedux } from '../../containers/routes/routesContainer';
import { configureStore } from '../../store/store';

const store = configureStore();

export class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux navigationBarStyle={styles.navBar} tintColor='#ffffff' titleStyle={styles.barButtonTextStyle}>
          <Scene key="root">
            <Scene key="login" component={SessionContainer} title="Login" initial={true}/>
            
          </Scene>
        </RouterRedux>
      </ Provider>
    );
  }
}
 