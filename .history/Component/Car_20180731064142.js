import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebaseService from '../enviroments/firebase';
import { ListItem,List ,Picker} from 'native-base';
export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      carlist:[],
      selectmake:undefined
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
              onValueChange={this.state.onValueChange.bind(this)}
            >
                {Object.keys(this.state.carlist).map((item, index) => {
                  return (< Picker.Item label={item} value={item} key={index} />);    
            })}   
            </Picker>
      </View>
    )
  }
}