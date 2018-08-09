import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Component/Home'
import Car from './Component/Car'


const Application = StackNavigator({
Home:{ screen: Home},
Car:{screen : Car},
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