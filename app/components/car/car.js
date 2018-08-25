import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Button } from 'react-native'
import firebaseService from '../../enviroments/firebase'
import { ListItem, List, Picker } from 'native-base'
import { Actions } from '../../../node_modules/react-native-router-flux'

export class Car extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
      details: [],
      cardetail: []
    }
  }

  componentWillMount () {
   
    this.props.DisplayMake()
  }

  

  ////////  เลือก model แล้วจะเอา model ไปหา series
  ModelSelect (value) { 
    const model = value
    const make = this.props.selectmake
    this.props.ModelSelect(make,model)
  }
 
  //////// onpress เพื่อเอา make,model,series ไปหารายละเอียดเพิ่มเติม
  CarDetail () {
    const make = this.props.selectmake
    const model = this.props.selectmodel
    const series = this.props.selectserie
    console.log(make)
    console.log(model)
    console.log(series)
    if (model != null && make != null && series != null) {
      firebaseService
        .database()
        .ref(`CarList/${make}/${model}/${series}`)
        .once(
          'value',
          function (snapshot) {
            const detail = snapshot.val()
            this.setState({ details: [detail] })
            this.setState({ cardetail: detail })
          }.bind(this),
          function (error) {
            console.log(error)
          }
        )
    }
    
    if(model == undefined && make == undefined && series == null){
      alert('กรุณาเลือก Make และ Model และ Serie')
     this.setState({details: []})
     this.setState({ cardetail: []})
     
  }
  if(make != undefined && model == undefined && series == undefined){
      
   alert('กรุณาเลือก Model และ Serie')
   this.setState({details: []})
   this.setState({ cardetail: []})
 }
 if(make != undefined && model != undefined && series == undefined){
      
  alert('กรุณาเลือก Serie')
  this.setState({details: []})
  this.setState({ cardetail: []})
}
  
  }

  ////// เลิกรถที่จะเอาไปจำลองหน้า start.js
  SetCar (detail) {
    if (this.state.cardetail.length != 0) {
      this.props.SetCar(detail)
      firebaseService.database().ref('SimulateCar/').set({
        CarDetail: this.state.cardetail
      })
      Actions.replace('start')
    } else {
      alert('Enter A Car')
    }
  }

  render () {
      
    return (
      <View>
        <Picker
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.props.selectmake}
          onValueChange={this.props.onValueChange.bind(this)}
        >
          <Picker.Item label='Select Make' value={null}/>
          {Object.keys(this.props.makelist).map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
          })}
        </Picker>
        <Picker
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.props.selectmodel} // change to props
          onValueChange={this.ModelSelect.bind(this)} // change to props
        >
        <Picker.Item label='Select Model' value={null}/>
          {Object.keys(this.props.modellist).map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
          })}
        </Picker>
        <Picker
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.props.selectserie}
          onValueChange={this.props.SerieSelect.bind(this)}
        >
        <Picker.Item label='Select Serie' value={null}/>
          {this.props.serielist.map((item, index) => {
            return (
              <Picker.Item
                label={Object.values(item)[5]} // ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
                value={index}
                key={index}
              />
            ) 
          })}
        </Picker>
        <TouchableHighlight>
          <Button title='Go' onPress={() => this.CarDetail()} />
        </TouchableHighlight>
        <View>
          <List
            dataArray={this.state.details}
            renderRow={item => {
              return (
                <View>
                  <Text>Model: {item.Model}</Text>
                  <Text>Speed: {item.Speed}</Text>
                  <Text>FuelType: {item.FuelType.FuelType}</Text>
                </View>
              )
            }}
          />
        </View>
        <Button
          title='START'
          onPress={() => this.SetCar(this.state.cardetail)}
        />
        <View />
      </View>
    )
  }
}
