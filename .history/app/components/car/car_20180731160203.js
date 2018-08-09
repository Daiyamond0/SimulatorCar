import React, { Component } from 'react'
import { Text, View ,TouchableHighlight,Button} from 'react-native'
import firebaseService from '../../enviroments/firebase';
import { ListItem,List ,Picker} from 'native-base';

export  class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carlist:[],
      selectmake:undefined,
      modellist:[],
      selectmodel:undefined,
      serielist:[],
      selectserie:[],
      details:[],
      cardetail:[]

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
  this.setState({selectserie:value});
}

CarDetail(){
    const make = this.state.selectmake;
    const model = this.state.selectmodel;
    const series = this.state.selectserie;
  if(model != null && make != null &&series!= null  ){
    firebaseService.database().ref(`CarList/${make}/${model}/${series}`).once('value',function(snapshot){
      const detail = snapshot.val();
      this.setState({ details: [detail] })
      this.setState({ cardetail: detail})
    }.bind(this), function(error) { console.log(error); });
  }
}
SetCar(detail){
    this.props.SetCar(detail);
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
            <TouchableHighlight>
              <Button title="Go" onPress={()=>this.CarDetail() }/>
            </TouchableHighlight>
            <View>
            <List dataArray={this.state.details} 
            renderRow={(item) =>{
              return(
              <View>
                <Text>Model: {item.Model}</Text>
                <Text>Speed: {item.Speed}</Text>
                <Text>FuelType: {item.FuelType.FuelType}</Text>
              </View>
              )
            }
            }>
          </List>
            </View>
            <Button title="OK" onPress={() => this.SetCar(this.state.cardetail)}/>
            <View>
     
      </View>
      </View>
      
    )
    
  }
}