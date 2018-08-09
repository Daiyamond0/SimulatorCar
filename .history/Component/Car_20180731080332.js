import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebaseService from '../enviroments/firebase';
import { ListItem,List ,Picker} from 'native-base';
export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      carlist:[],
      selectmake:undefined,
      modellist:[],
      selectmodel:undefined,
      serielist:[],
      selectserie:[],

    };
}

componentWillMount(){
        firebaseService.database().ref("CarList").on("value",function(snapshot) {
          const carlist = snapshot.val();
          this.setState({carlist:carlist})
      }.bind(this), function(error) { console.log(error); });
}
onValueChange(value) {
  this.setState({
    selectmake: value
  });
  const make = value
  firebaseService.database().ref(`/CarList/${make}`).on("value",function(snapshot) {
    const modellist = snapshot.val();
    this.setState({modellist:modellist})
}.bind(this), function(error) { console.log(error); });
}

ModelSelect(value){
  this.setState({selectmodel:value});
  const model = value;
  const make = this.state.selectmake;
  firebaseService.database().ref(`CarList/${make}/${model}`).on('value',function(snapshot){
    const serielist = snapshot.val();
    this.setState({ serielist: serielist })
}.bind(this), function(error) { console.log(error); });
}

SerieSelect(value){
  this.setState({selectserie:value})
}







  render() {
    return (
      <View>
        <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.selectmake}
              onValueChange={this.onValueChange.bind(this)}
            >
                {Object.keys(this.state.carlist).map((item, index) => {
                  return (< Picker.Item label={item} value={item} key={index} />);    
            })}   
            </Picker>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.selectmodel} // change to props
              onValueChange={this.ModelSelect.bind(this)} // change to props
            >
              {Object.keys(this.state.modellist).map((item, index) => {
              return (< Picker.Item label={item} value={item} key={index} />);
            })} 
            </Picker>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              placeholderStyle={{ color: "#2874F0" }}
              note={false}
              selectedValue={this.state.selectserie}
              onValueChange={this.SerieSelect.bind(this)}
            >
              {this.state.serielist.map((item, index) => {
              return (< Picker.Item label={Object.values(item)[2]} value={index} key={index} />);  /// ถ้าเพิ่ม document ต้องแก้ให้เลือกที่ model car
              })} 
            </Picker>
      </View>
    )
  }
}