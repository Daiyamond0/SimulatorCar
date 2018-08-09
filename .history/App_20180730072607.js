import React, { Component } from '../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from '../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-navigation';
import HomeScreen from './Component/HomeScreen'
import CarScreen from './Component/CarScreen'


const Application = StackNavigator({
Home:{ screen: HomeScreen},
Car:{screen : CarScreen},
},  { navigationOptions :{
      header: false,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  render() {
    return (
        <Application/> 
    );
  }
}