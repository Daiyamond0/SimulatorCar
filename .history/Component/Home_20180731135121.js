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
  Image
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import firebaseService from '../enviroments/firebase';
import Car from './Car'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        currentSpeed: 0,
        speedId : 0,
        arrVar: Number.parseInt([],10),
        sum : 0,
    }
    this.ref = firebaseService.database().ref('Holds');
    this.timer = null;
    this.addOne = this.addOne.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    
  }

  addOne() {
    const currentSpeed = this.state.currentSpeed  ;
    clearTimeout(this.timer);
    this.setState({currentSpeed: currentSpeed + 0.1});
    this.setState({arrVar:[...this.state.arrVar, currentSpeed.toFixed(1)]});
    this.timer = setTimeout(this.addOne, 1);
    var numbers = this.state.arrVar;
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i],10)
    }
     this.ref.push({
      speedId : this.state.speedId,
      distance :currentSpeed,
    })
    this.setState({
      speedId: this.state.speedId + 1,
      sum : sum
    }); 
  }
  stopTimer() {
    const currentSpeed = this.state.currentSpeed;
    clearTimeout(this.timer);
    if((currentSpeed - 0.1) >= 0){
    this.setState({currentSpeed: currentSpeed - 0.1});
    this.setState({arrVar:[...this.state.arrVar, currentSpeed.toFixed(1)]});
    this.timer = setTimeout(this.stopTimer, 1);
    }
    
    var numbers = this.state.arrVar;
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i],10)
    }
     this.ref.push({
      speedId : this.state.speedId,
      distance : currentSpeed,
    })
     this.setState({
      speedId: this.state.speedId + 1,
      sum : sum
    });
  }
  Reset(){
    firebaseService.database().ref('Holds').remove();
  }
    
    
  render() {
    
  TimerMixin.setTimeout(() => {
        console.log('value',this.state.currentSpeed.toFixed(1));
      }, 0.1);

      return (
    <View style={styles.container}>
    <Text>{this.state.currentSpeed.toFixed(1)}</Text>
      <TouchableOpacity onPressIn={this.addOne} onPressOut={this.stopTimer}  >
      <Image source={require('../icons/icons-add.png')}/>
      </TouchableOpacity>
      <Text>{this.state.arrVar+","}</Text>
      <Text>{this.state.sum.toFixed(1)}</Text>  
      <View style={{flexDirection:'row',margin:10}}> 
      <View style={{marginRight :15}}>
        <Button title='Car' onPress={() => this.props.navigation.navigate('Car')} />
        </View>
        <View>
         <Button title='Reset' onPress={ ()=>this.Reset()} />
         </View>
         
           <Car data='eiei'/>
           
        
        </View>
        
       
        
      
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
  }
});
