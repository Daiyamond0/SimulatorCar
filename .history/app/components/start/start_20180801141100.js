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



export  class Start extends Component {
  constructor(props){
    super(props);
    this.state={
        currentSpeed: 0,
        speedId : 0,
        arrVar: Number.parseInt([],10),
        sum : 0,

        fueluse:this.props.CarDetail.FuelCapacity,
        fuelusemodal:0,
        isModalVisible:false,
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
    Actions.refresh('start')
  }
    
  toggleModal(){
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  fueluse(){
    if(this.state.fuelusemodal <= this.props.CarDetail.FuelCapacity){
    this.setState({ isModalVisible: !this.state.isModalVisible });
    const x  = this.state.fuelusemodal;
    this.setState({fueluse:x});
    }else{
      alert('Try Again')
    }
  }

    
  render() {
    
  // TimerMixin.setTimeout(() => {
  //       console.log('value',this.state.currentSpeed.toFixed(1));
  //     }, 0.1);
  TimerMixin.setTimeout(() => {
    this.setState({fueluse:this.state.fueluse - 1})
      }, 0.1);
      
      return (
    <View style={styles.container}>
    <Text>Speed: {this.state.currentSpeed.toFixed(1)} M/S</Text>
      <TouchableOpacity onPressIn={this.addOne} onPressOut={this.stopTimer}  >
      <Image source={require('../../../icons/icons-add.png')}/>
      </TouchableOpacity>
      {/* <Text>{this.state.arrVar+","}</Text> SpeedAll */}
      <Text>Distance: {this.state.sum.toFixed(1)} M</Text>  
      <View style={{flexDirection:'row',margin:10}}> 
        <View>
         <Button title='Reset' onPress={ ()=>this.Reset()} />
         </View>
         
        </View>
        <View>
           <Text>MAKE: {this.props.CarDetail.Make}</Text>
           <Text>MODEL: {this.props.CarDetail.Model}</Text>
           <Text>FUELCAPACITY: {this.props.CarDetail.FuelCapacity} L</Text>
        </View>
        <View style={{padding:15 , flexDirection:'row' , alignItems:'center'}}> 
        
          <Text>Fueluse: {this.state.fueluse} </Text>
          <Text> Of {this.props.CarDetail.FuelCapacity} L  </Text>
          <Button title='fueluse' onPress={this.toggleModal.bind(this)} />
          <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <Text>Enter Fueluse</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(fuelusemodal) => this.setState({fuelusemodal})}
            />
            <View style={{flexDirection:'row'}}>
            <View style={{marginRight:10}}>
            <Button title='OK' onPress={this.fueluse.bind(this)}/>
            </View>
            <View>
            <Button title='Cancel' onPress={this.toggleModal.bind(this)}/>
            </View>
            </View>
            
          </View>
        </Modal>
          
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
