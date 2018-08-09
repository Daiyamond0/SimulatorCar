/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Animated,
  TouchableWithoutFeedback,
  Image,
  TextInput
} from 'react-native';
import Modal from "react-native-modal";
import TimerMixin from 'react-timer-mixin';
import firebaseService from '../../enviroments/firebase';
import { Actions } from '../../../node_modules/react-native-router-flux';



export  class Home extends Component {
 

    
  render() {
   

      return (
    <View style={styles.container}>
    <Button title='GO' onPress={Actions.start}/>

       
   
 </View>
    );
    
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },button: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#111'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});
