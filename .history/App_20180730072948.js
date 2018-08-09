import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Component/HomeScreen'
import Car from './Component/CarScreen'


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