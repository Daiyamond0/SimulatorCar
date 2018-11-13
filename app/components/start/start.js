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
  
  Animated,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  ScrollView
} from 'react-native'
import Modal from 'react-native-modal'
import TimerMixin from 'react-timer-mixin'
import firebaseService from '../../enviroments/firebase'
import { Actions } from '../../../node_modules/react-native-router-flux'
import timer from 'react-native-timer'
import Speedometer from 'react-native-speedometer-chart';
import AnimatedBar from "react-native-animated-bar";
import { Col,Button } from 'native-base';

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
      totalfueluse:0,
      distanceArray:[0,0]
    }
    this.ref = firebaseService.database().ref('Speed')
    this.timer = null
    this.addOne = this.addOne.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.generateRandomNumber = this.generateRandomNumber.bind(this)
    this.acc = null
    this.intervalId = null;
  }

 


  newRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  generateRandomNumber () { 
    this.setState({ acceleration: 30 })
    timer.setTimeout('show',()=>
    this.setState({acceleration: 50})
    ,5000)
    timer.setTimeout('show2',()=>this.setState({acceleration: 70}),10000)

    setTimeout(()=>{ 
      
      const distancebetween = (this.state.distanceArray[this.state.distanceArray.length - 1]) - (this.state.distanceArray[this.state.distanceArray.length - 2])
      const currentSpeed = this.state.currentSpeed
      var totalfueluse  
      if(currentSpeed >80 && currentSpeed<=100){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.2))
      }else if(currentSpeed >100 && currentSpeed<=120){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.4))
      }
      else if(currentSpeed >120 && currentSpeed<=140){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.5))
    } else if(currentSpeed >140 && currentSpeed<=this.props.CarDetail.MaximumSpeed){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.6))
    }
      else{
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.2))
      }
      this.setState({totalfueluse:this.state.totalfueluse + totalfueluse})
    },2000)
  }

  addOne () {
    if (this.state.currentSpeed < this.props.CarDetail.MaximumSpeed) {
      const distancebetween = (this.state.distanceArray[this.state.distanceArray.length - 1]) - (this.state.distanceArray[this.state.distanceArray.length - 2])
      const currentSpeed = this.state.currentSpeed
      var totalfueluse  
      if(currentSpeed >80 && currentSpeed<=100){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.1))
      }else if(currentSpeed >100 && currentSpeed<=120){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.2))
      }
      else if(currentSpeed >120 && currentSpeed<=140){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.25))
    } else if(currentSpeed >140 && currentSpeed<=this.props.CarDetail.MaximumSpeed){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.3))
    }
      else{
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption *0.15 ))
      }
      this.setState({totalfueluse:this.state.totalfueluse + totalfueluse})
      
      
      clearTimeout(this.timer)
      this.setState({ currentSpeed: currentSpeed + 10 * (5 / 18) }) // 10 คึอความเร็วคงที่เปลียนได้ ,5/18 คือ m/s to km/h
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.addOne, 100)
      var numbers = this.state.arrVar
      var sum = 0

      for (var i = 0; i < numbers.length; i++) {
        sum += Number.parseFloat(numbers[i], 10)
      }
      this.ref.push({
        speedId: this.state.speedId,
        distance: parseFloat(currentSpeed,10),
        totalfueluse: parseFloat(this.state.totalfueluse,10),
        acceleration: this.state.acceleration
      })
      this.setState({
        speedId: this.state.speedId + 1,
        sum: sum / 1000,
        distanceArray:[...this.state.distanceArray, sum /1000]

      })
    } else {
      const currentSpeed = this.state.currentSpeed
      const distancebetween = (this.state.distanceArray[this.state.distanceArray.length - 1]) - (this.state.distanceArray[this.state.distanceArray.length - 2])
      var totalfueluse  
      if(currentSpeed >80 && currentSpeed<=100){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.1))
      }else if(currentSpeed >100 && currentSpeed<=120){
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.2))
      }
      else if(currentSpeed >120 && currentSpeed<=140){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption  - (this.props.CarDetail.FuelConsumption *0.25))
    } else if(currentSpeed >140 && currentSpeed<=this.props.CarDetail.MaximumSpeed){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.3))
    }
      else{
        totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption * 0.15 ))
      }
      this.setState({totalfueluse:this.state.totalfueluse + totalfueluse})
     
      const x = this.state.acceleration + 20
      clearTimeout(this.timer)
      this.setState({ currentSpeed: this.props.CarDetail.MaximumSpeed }) // 10 คึอความเร็วคงที่เปลียนได้ ,5/18 คือ m/s to km/h
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.addOne, 100)
      var numbers = this.state.arrVar
      var sum = 0
      for (var i = 0; i < numbers.length; i++) {
        sum += Number.parseFloat(numbers[i], 10)

      }
      this.ref.push({
        speedId: this.state.speedId,
        distance: parseFloat(currentSpeed,10),
        totalfueluse: parseFloat(this.state.totalfueluse,10),
        acceleration: this.state.acceleration
      })
      this.setState({
        speedId: this.state.speedId + 1,
        sum: sum / 1000,
        distanceArray:[...this.state.distanceArray,sum /1000]
      })
    }
  }
  stopTimer () {
    this.setState({ acceleration: 0 })
    const currentSpeed = this.state.currentSpeed
    const distancebetween = (this.state.distanceArray[this.state.distanceArray.length - 1]) - (this.state.distanceArray[this.state.distanceArray.length - 2])
    var totalfueluse  
    if(currentSpeed >80 && currentSpeed<=100){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.1))
    }else if(currentSpeed >100 && currentSpeed<=120){
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.2))
    }
    else if(currentSpeed >120 && currentSpeed<=140){
    totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.25))
  } else if(currentSpeed >140 && currentSpeed<=this.props.CarDetail.MaximumSpeed){
    totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption - (this.props.CarDetail.FuelConsumption *0.3))
  }
    else{
      totalfueluse =   distancebetween / (this.props.CarDetail.FuelConsumption + (this.props.CarDetail.FuelConsumption * 0.15) )
    }
    this.setState({totalfueluse:this.state.totalfueluse + totalfueluse})
    clearTimeout(this.timer)
    if (currentSpeed - 0.1 >= 0) {
      this.setState({ currentSpeed: currentSpeed - 10 * (5 / 18) })
      this.setState({ arrVar: [...this.state.arrVar, parseFloat(currentSpeed,10)] })
      this.timer = setTimeout(this.stopTimer, 100)
    }

    var numbers = this.state.arrVar
    var sum = 0
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i], 10)
    }
    this.ref.push({
      speedId: this.state.speedId,
      distance: parseFloat(currentSpeed,10),
      totalfueluse:parseFloat(this.state.totalfueluse,10),
      acceleration: this.state.acceleration,
      
    })
    this.setState({
      speedId: this.state.speedId + 1,
      sum: sum / 1000,
      distanceArray:[...this.state.distanceArray,sum /1000]
    })
  }
  Reset () {
    firebaseService.database().ref('Speed').remove()
    Actions.replace('start')
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
    // this.setState({ fueluse: this.state.fueluse })
  
    
    


  }

  componentWillUnmount(){
    timer.clearTimeout(this);
    clearInterval(this.intervalId)
  }

  
  render () {
    // TimerMixin.setTimeout(() => {
    //       console.log('value',this.state.currentSpeed.toFixed(1));
    //     }, 0.1);
    console.log(this.state.totalfueluse)
    var fueluse = this.state.fueluse
    const speed = this.state.currentSpeed
    var totalfueluse = this.state.totalfueluse
    fueluse -= totalfueluse
    const fuelconsumption = this.state.distanceArray[this.state.distanceArray.length- 1] / this.state.totalfueluse // ระยะทางที่เพิ่มขึ้นครั้งสุดท้าย / น้ำมันที่ใช้
    return (
      <View>
      <ScrollView>
      <Text style={{fontSize:20,color:'black',marginTop:20,marginLeft:30}}>Simulator Car</Text>
            <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{fontSize:11,color:'#6a83fb',marginLeft:15}}>Brand</Text>
                    </View>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{fontSize:13,color:'white',marginLeft:15}}>{this.props.CarDetail.Make}</Text>
                    </View>
            </View>
            <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{fontSize:11,color:'#6a83fb',marginLeft:15}}>Model</Text>
                    </View>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{fontSize:13,color:'white',marginLeft:15}}>{this.props.CarDetail.Model}</Text>
                    </View>
            </View>
            <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{fontSize:11,color:'#6a83fb',marginLeft:15}}>Fuel Volume Capacity</Text>
                    </View>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{fontSize:13,color:'white',marginLeft:15}}>{this.props.CarDetail.FuelCapacity} L</Text>
                    </View>
            </View>
            <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{fontSize:11,color:'#6a83fb',marginLeft:15}}>Fuel Consumption</Text>
                    </View>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{fontSize:13,color:'white',marginLeft:15}}>{this.props.CarDetail.FuelConsumption} km/L</Text>
                    </View>
            </View>
            <View style={{flexDirection:'row',marginTop:15,alignSelf:'center'}}>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'white',borderColor:'#6a83fb',borderWidth:0.5,borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{fontSize:11,color:'#6a83fb',marginLeft:15}}>Maximum Speed</Text>
                    </View>
                    <View style={{justifyContent:'center',width:135,height:40,backgroundColor:'#6a83fb',borderColor:'#6a83fb',borderWidth:0.5,borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{fontSize:13,color:'white',marginLeft:15}}>{this.props.CarDetail.MaximumSpeed} km/hr</Text>
                    </View>
            </View>
            <View style={{height:450,backgroundColor:'#52dec3',marginTop:20}}>
              <View style={{height:150,width:340,backgroundColor:'white',marginTop:10,marginLeft:10}}>
                <Text style={{fontSize:15,color:'black',marginTop:10,marginLeft:20}}>Speed</Text>                  
                  <View style={{marginTop:10,height:90,width:280,backgroundColor:'#6a83fb',alignSelf:'center',borderRadius:10}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image
                              style={{width: 80, height: 80,marginLeft:15,marginTop:5}}
                              source={require('./icon.png')}
                                
                          />
                          <View style={{flexDirection:'column',marginLeft:80}}>
                          <Text style={{fontSize:25,color:'white',marginLeft:10}}>{speed.toFixed(1)}</Text>
                          <Text style={{fontSize:20,color:'white'}}>km/h</Text>
                          </View>
                  </View>
                  </View>
              </View>
              <View style={{height:150,width:340,backgroundColor:'white',marginTop:15,marginLeft:10}}>
                <Text style={{fontSize:15,color:'black',marginTop:10,marginLeft:20}}>Fuel Use</Text>                  
                  <View style={{marginTop:10,height:90,width:280,backgroundColor:'#6a83fb',alignSelf:'center',borderRadius:10}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image
                              style={{width: 80, height: 80,marginLeft:15,marginTop:5}}
                              source={require('./fuel.png')}
                                
                          />
                          <View style={{flexDirection:'column',marginLeft:65}}>
                          <Text style={{fontSize:25,color:'white'}}>{parseInt(fueluse)} / {this.props.CarDetail.FuelCapacity}</Text>
                          <Text style={{fontSize:20,color:'white',marginLeft:32}}>L</Text>
                          </View>
                  </View>
                  </View>
              </View>
              
              <View style={{height:75,width:380,backgroundColor:'white',marginTop:50}}>
              <View style={{marginLeft:10,flexDirection:'row'}}>
              <Text style={{color:'#6a83fb',fontSize:12,marginTop:10}}>Accelerator: {this.state.acceleration} %</Text>
              <Button style={{marginLeft:150,width:100,marginTop:5,height:28,backgroundColor:'#6a83fb',justifyContent:'center'}} onPress={this.toggleModal.bind(this)}>
              <Text style={{color:'white',fontSize:10}}>Fuel Refill</Text>
              </Button>
              </View>
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
                    onPress={() => this.fuelUse(totalfueluse)}>
                  <Text>OK</Text>
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={this.toggleModal.bind(this)}>
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </View>

            </View>
          </Modal>
              <View style={{marginLeft:10,flexDirection:'row'}}>
              <Text style={{color:'#6a83fb',fontSize:12,marginTop:15}}>Fuel Volume Used: {totalfueluse.toFixed(1)} L</Text>
              <Button style={{marginLeft:118,width:100,marginTop:5,height:28,backgroundColor:'#6a83fb',justifyContent:'center'}} onPress={() => this.Reset()}>
              <Text style={{color:'white',fontSize:10}}>Reset</Text>
              </Button>
              </View>
              </View>
              <View style={{flexDirection:'row',alignSelf:'center',position:'absolute',marginTop:340}}>
              <View style={{height:110,width:110,backgroundColor:'#efec1a',borderRadius:60}}></View>
              </View>
            <View style={{flexDirection:'row',alignSelf:'center',position:'absolute',marginTop:350}}>
            <TouchableOpacity
              onPressIn={this.addOne.bind(this)}
              onPressOut={this.stopTimer.bind(this)}
              onLongPress={this.generateRandomNumber.bind(this)}
            >
            <Image
                              style={{width: 80, height: 80,marginTop:5}}
                              source={require('./ac.png')}
                              
                              />
                              </TouchableOpacity>
                          </View>
                              </View>

            </ScrollView>
    </View>

    //   <View style={styles.container}>
    //     <Speedometer  
    //     value={Number(speed.toFixed(1))} 
    //     totalValue={Number(this.props.CarDetail.MaximumSpeed)} 
    //     internalColor={Number(speed.toFixed(1))<Number(this.props.CarDetail.MaximumSpeed) * 0.75 ? '#2eb82e' : "#ff0000"}
    //     showText
    //     showLabels
    //     size={100}
    // />
    //     <Text>Speed: {speed.toFixed(1)} KM/H</Text>
        
    //         <TouchableOpacity
    //           onPressIn={this.addOne.bind(this)}
    //           onPressOut={this.stopTimer.bind(this)}
    //           onLongPress={this.generateRandomNumber.bind(this)}
    //         >
    //           <Image source={require('../../../icons/icons-add.png')}  />
    //         </TouchableOpacity>
          
          
        
    //     {/* <Text>{this.state.arrVar+","}</Text> AllSpeed */}
    //     <Text>Distance: {this.state.sum.toFixed(2)} KM</Text>
    //     <View style={{ flexDirection: 'row', margin: 10 }}>
    //       <View>
    //         <Button title='Reset' onPress={() => this.Reset()} />
    //       </View>

    //     </View>
      
    //     <View>
    //       <Text>MAKE: {this.props.CarDetail.Make}</Text>
    //       <Text>MODEL: {this.props.CarDetail.Model}</Text>
    //       <Text>FUELCAPACITY: {this.props.CarDetail.FuelCapacity} L</Text>
    //       <Text>
    //         FuelConsimption: {this.props.CarDetail.FuelConsumption} KM/L
    //       </Text>
    //       <Text>MaximumSpeed: {this.props.CarDetail.MaximumSpeed} </Text>
    //     </View>
    //     <View style={styles.row}>
          
    //       <AnimatedBar
    //         progress={parseInt(fueluse)}
    //         height={40}
    //         borderColor="#DDD"
    //         barColor="tomato"
    //         borderRadius={5}
    //         borderWidth={5}
    //         duration={500}
    //         row
    //       >
    //         <View style={[styles.row, styles.center, { flex: 1 }]}>
    //           <Text style={styles.barText}>
    //             {Math.round((parseInt(fueluse) *100) / this.props.CarDetail.FuelCapacity )}%
    //           </Text>
    //         </View>
    //       </AnimatedBar>
          
    //     </View>
    //     <View
    //       style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
    //     >

    //       <Text>Fueluse: {parseInt(fueluse)} </Text>
    //       <Text> Of {this.props.CarDetail.FuelCapacity} L </Text>
    //       <Button title='fueluse' onPress={this.toggleModal.bind(this)} />
    //       <Modal isVisible={this.state.isModalVisible}>
    //         <View style={styles.modalContent}>
    //           <Text>Enter Fueluse</Text>
    //           <TextInput
    //             keyboardType='numeric'
    //             onChangeText={fuelusemodal => this.setState({ fuelusemodal })}
    //           />
    //           <View style={{ flexDirection: 'row' }}>
    //             <View style={{ marginRight: 10 }}>
    //               <Button
    //                 title='OK'
    //                 onPress={() => this.fuelUse(totalfueluse)}
    //               />
    //             </View>
    //             <View>
    //               <Button
    //                 title='Cancel'
    //                 onPress={this.toggleModal.bind(this)}
    //               />
    //             </View>
    //           </View>

    //         </View>
    //       </Modal>

    //     </View>
    //     <Text>Fuel Consumtion:{fuelconsumption.toFixed(1)}</Text>
    //     <Text>Total Fueluse:{totalfueluse.toFixed(1)}</Text>
    //     <Text>acceleration: {this.state.acceleration}</Text>

    //   </View>
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
