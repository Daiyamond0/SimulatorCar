import React, { Component } from '../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from '../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-navigation';
import Home from './Component/Home'
import Car from './Component/Car'


const Application = StackNavigator({
Home:{ screen: Home},
Car:{screen : Car},
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