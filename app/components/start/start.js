/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
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
} from 'react-native'
import Modal from 'react-native-modal'
import TimerMixin from 'react-timer-mixin'
import firebaseService from '../../enviroments/firebase'
import { Actions } from '../../../node_modules/react-native-router-flux'
import timer from 'react-native-timer'
import Speedometer from 'react-native-speedometer-chart';
import AnimatedBar from "react-native-animated-bar";
import { Col } from 'native-base';

export class Start extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSpeed: 0,
      speedId: 0,
      arrVar: Number.parseInt([], 10),
      sum: 0,

      fueluse: this.props.CarDetail.FuelCapacity,
      fuelusemodal: 0,
      isModalVisible: false,

      fuelusetotal: 0,

      acceleration: 0,

      acc:[],

      progress: 0,
    }
    this.ref = firebaseService.database().ref('Speed')
    this.timer = null
    this.addOne = this.addOne.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.generateRandomNumber = this.generateRandomNumber.bind(this)
    this.acc = null
  }

 


  newRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  generateRandomNumber () { 
    this.setState({ acceleration: 30 })
    
    // timer.clearTimeout(this);
    timer.setTimeout('show',()=>
    this.setState({acceleration: 50})
    ,5000)
    
    
    timer.setTimeout('show2',()=>this.setState({acceleration: 70}),10000)
  }

  addOne () {
    if (this.state.currentSpeed < this.props.CarDetail.MaximumSpeed) {
      const currentSpeed = this.state.currentSpeed
      const totalfueluse = this.state.sum / this.props.CarDetail.FuelConsumption
      clearTimeout(this.timer)
      this.setState({ currentSpeed: currentSpeed + 10 * (5 / 18) }) // 10 คึอความเร็วคงที่เปลียนได้ ,5/18 คือ m/s to km/h
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.addOne, 0.1)
      var numbers = this.state.arrVar
      var sum = 0
      for (var i = 0; i < numbers.length; i++) {
        sum += Number.parseFloat(numbers[i], 10)
      }
      this.ref.push({
        speedId: this.state.speedId,
        distance: parseFloat(currentSpeed,10),
        totalfueluse: parseFloat(totalfueluse,10),
        acceleration: this.state.acceleration
      })
      this.setState({
        speedId: this.state.speedId + 1,
        sum: sum / 1000
      })
    } else {
      const currentSpeed = this.state.currentSpeed
      const totalfueluse = this.state.sum / this.props.CarDetail.FuelConsumption
      const x = this.state.acceleration + 20
      clearTimeout(this.timer)
      this.setState({ currentSpeed: this.props.CarDetail.MaximumSpeed }) // 10 คึอความเร็วคงที่เปลียนได้ ,5/18 คือ m/s to km/h
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.addOne, 0.1)
      var numbers = this.state.arrVar
      var sum = 0
      for (var i = 0; i < numbers.length; i++) {
        sum += Number.parseFloat(numbers[i], 10)
      }
      this.ref.push({
        speedId: this.state.speedId,
        distance: parseFloat(currentSpeed,10),
        totalfueluse: parseFloat(totalfueluse,10),
        acceleration: this.state.acceleration
      })
      this.setState({
        speedId: this.state.speedId + 1,
        sum: sum / 1000
      })
    }
  }
  stopTimer () {
    this.setState({ acceleration: 0 })
    const currentSpeed = this.state.currentSpeed
    const totalfueluse = this.state.sum / this.props.CarDetail.FuelConsumption
    clearTimeout(this.timer)
    if (currentSpeed - 0.1 >= 0) {
      this.setState({ currentSpeed: currentSpeed - 10 * (5 / 18) })
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.stopTimer, 0.1)
    }

    var numbers = this.state.arrVar
    var sum = 0
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i], 10)
    }
    this.ref.push({
      speedId: this.state.speedId,
      distance: parseFloat(currentSpeed,10),
      totalfueluse:parseFloat(totalfueluse,10),
      acceleration: this.state.acceleration
    })
    this.setState({
      speedId: this.state.speedId + 1,
      sum: sum / 1000
    })
  }
  Reset () {
    firebaseService.database().ref('Speed').remove()
    Actions.refresh('start')
  }

  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  fuelUse (totalfueluse) {
    if (this.state.fuelusemodal <= this.props.CarDetail.FuelCapacity) {
      this.setState({ isModalVisible: !this.state.isModalVisible })

      const x = this.state.fuelusemodal
      this.setState({ fueluse: parseInt(x) + totalfueluse })
    } else {
      alert('Try Again')
    }
  }
  componentDidMount () {
    // TimerMixin.setInterval(() => {
    // this.setState({fueluse:this.state.fueluse - 1})
    //   }, 5000);
    this.setState({ fueluse: this.state.fueluse })
  }

  componentWillUnmount(){
    timer.clearTimeout(this);
  }

  
  render () {
    // TimerMixin.setTimeout(() => {
    //       console.log('value',this.state.currentSpeed.toFixed(1));
    //     }, 0.1);

    var fueluse = this.state.fueluse
    const speed = this.state.currentSpeed
    var totalfueluse = this.state.sum / this.props.CarDetail.FuelConsumption
    fueluse -= totalfueluse
    return (
      <View style={styles.container}>
        <Speedometer  
        value={Number(speed.toFixed(1))} 
        totalValue={Number(this.props.CarDetail.MaximumSpeed)} 
        internalColor={Number(speed.toFixed(1))<Number(this.props.CarDetail.MaximumSpeed) * 0.75 ? '#2eb82e' : "#ff0000"}
        showText
        showLabels
        size={100}
    />
        <Text>Speed: {speed.toFixed(1)} KM/H</Text>
        
            <TouchableOpacity
              onPressIn={this.addOne.bind(this)}
              onPressOut={this.stopTimer.bind(this)}
              onLongPress={this.generateRandomNumber.bind(this)}
            >
              <Image source={require('../../../icons/icons-add.png')}  />
            </TouchableOpacity>
          
          
        
        {/* <Text>{this.state.arrVar+","}</Text> AllSpeed */}
        <Text>Distance: {this.state.sum.toFixed(2)} KM</Text>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View>
            <Button title='Reset' onPress={() => this.Reset()} />
          </View>

        </View>
      
        <View>
          <Text>MAKE: {this.props.CarDetail.Make}</Text>
          <Text>MODEL: {this.props.CarDetail.Model}</Text>
          <Text>FUELCAPACITY: {this.props.CarDetail.FuelCapacity} L</Text>
          <Text>
            FuelConsimption: {this.props.CarDetail.FuelConsumption} KM/L
          </Text>
          <Text>MaximumSpeed: {this.props.CarDetail.MaximumSpeed} </Text>
        </View>
        <View style={styles.row}>
          
          <AnimatedBar
            progress={parseInt(fueluse)}
            height={40}
            borderColor="#DDD"
            barColor="tomato"
            borderRadius={5}
            borderWidth={5}
            duration={500}
            row
          >
            <View style={[styles.row, styles.center, { flex: 1 }]}>
              <Text style={styles.barText}>
                {Math.round((parseInt(fueluse) *100) / this.props.CarDetail.FuelCapacity )}%
              </Text>
            </View>
          </AnimatedBar>
          
        </View>
        <View
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
        >

          <Text>Fueluse: {parseInt(fueluse)} </Text>
          <Text> Of {this.props.CarDetail.FuelCapacity} L </Text>
          <Button title='fueluse' onPress={this.toggleModal.bind(this)} />
          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modalContent}>
              <Text>Enter Fueluse</Text>
              <TextInput
                keyboardType='numeric'
                onChangeText={fuelusemodal => this.setState({ fuelusemodal })}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 10 }}>
                  <Button
                    title='OK'
                    onPress={() => this.fuelUse(totalfueluse)}
                  />
                </View>
                <View>
                  <Button
                    title='Cancel'
                    onPress={this.toggleModal.bind(this)}
                  />
                </View>
              </View>

            </View>
          </Modal>

        </View>

        <Text>Total Fueluse:{totalfueluse.toFixed(1)}</Text>
        <Text>acceleration: {this.state.acceleration}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
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
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  row: {
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  barText: {
    backgroundColor: "transparent",
    color: "#FFF",
  },
})
