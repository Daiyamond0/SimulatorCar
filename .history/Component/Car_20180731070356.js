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
      modellist:[]
    };
}
onValueChange(value) {
  this.setState({
    selectmake: value
  });
}
componentWillMount(){
        firebaseService.database().ref("CarList").on("value",function(snapshot) {
          const carlist = snapshot.val();
          this.setState({carlist:carlist})
      }.bind(this), function(error) { console.log(error); });
  

}
componentDidMount() {
  const make = this.state.selectmake
  firebaseService.database().ref(`/CarList/${make}`).on("value",function(snapshot) {
    const modellist = snapshot.val();
    this.setState({modellist:modellist})
}.bind(this), function(error) { console.log(error); });
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
              selectedValue={this.props.modelselect} // change to props
              onValueChange={this.props.Modelchange} // change to props
            >
              {Object.keys(this.state.modellist).map((item, index) => {
              return (< Picker.Item label={item} value={item} key={index} />);
            })} 
            </Picker>
      </View>
    )
  }
}