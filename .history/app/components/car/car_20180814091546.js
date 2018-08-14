import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Button } from 'react-native'
import firebaseService from '../../enviroments/firebase'
import { ListItem, List, Picker } from 'native-base'
import { Actions } from '../../../node_modules/react-native-router-flux'

export class Car extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carlist: [],
      selectmake: undefined,
      modellist: [],
      selectmodel: undefined,
      serielist: [],
      selectserie: [],
      details: [],
      cardetail: []
    }
  }

  componentWillMount () {
    /// เข้ามาหน้านี้จะแสดง makecar ก่อน
    // firebaseService.database().ref('CarList').on('value', function (snapshot) {
    //   const carlist = snapshot.val()
    //   this.setState({ carlist: carlist })
    // }.bind(this), function (error) {
    //   console.log(error)
    // })
    this.props.DisplayMake()
  }

  ///////// เลือก make แล้วจะเอา make ไปหา model ของ make ที่เลือก
  // onValueChange (value) {
  //   this.setState({
  //     selectmake: value
  //   })
  //   const make = value
  //   firebaseService.database().ref(`/CarList/${make}`).on('value', function (
  //     snapshot
  //   ) {
  //     const modellist = snapshot.val()
  //     this.setState({ modellist: modellist })
  //   }.bind(this), function (error) {
  //     console.log(error)
  //   })
  // }

  ////////  เลือก model แล้วจะเอา model ไปหา series
  // ModelSelect (value) {
  //   this.setState({ selectmodel: value })
  //   const model = value
  //   const make = this.props.selectmake
  //   firebaseService
  //     .database()
  //     .ref(`CarList/${make}/${model}`)
  //     .on(
  //       'value',
  //       function (snapshot) {
  //         const serielist = snapshot.val()
  //         this.setState({ serielist: serielist })
  //       }.bind(this),
  //       function (error) {
  //         console.log(error)
  //       }
  //     )
  // }
  ////////// setcar series ไว้ที่่ state
  SerieSelect (value) {
    this.setState({ selectserie: value })
  }
  //////// onpress เพื่อเอา make,model,series ไปหารายละเอียดเพิ่มเติม
  CarDetail () {
    const make = this.props.selectmake
    const model = this.props.selectmodel
    const series = this.state.selectserie
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
    const selectmake = this.props.selectmake
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
          onValueChange={this.props.ModelSelect(value)} // change to props
        >
          {Object.keys(this.props.modellist).map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
          })}
        </Picker>
        <Picker
          mode='dropdown'
          placeholder='Select One'
          placeholderStyle={{ color: '#2874F0' }}
          note={false}
          selectedValue={this.state.selectserie}
          onValueChange={this.SerieSelect.bind(this)}
        >
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
