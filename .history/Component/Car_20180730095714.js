import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebaseService from '../enviroments/firebase';
export default class Car extends Component {
  constructor() {
    super();
    this.ref = firebaseService.database().ref('Holds')
    this.unsubscribe = null;
    this.state = {
        loading: true,
        speed: [],
        distance: [],
        sum :0 ,
    };
    
}
componentDidMount() {
  const speed = [];
  this.unsubscribe = this.ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      speed.push(childData)
    }.bind(this));
    console.log(speed)
  }.bind(this));
  this.setState({ 
    speed,
    loading: false,
 });
 console.log(this.state.speed)
 this.getDistance()
  var sum = 0;
  var numbers = this.state.distance;
    for (var i = 0; i < numbers.length; i++) {
      sum += Number.parseFloat(numbers[i],10)
    }
    this.setState({
      sum : sum
    }); 
}

componentWillUnmount() {
  this.unsubscribe;
}

// onCollectionUpdate = (querySnapshot) => {
//   const speed = [];
//   querySnapshot.forEach((doc) => {
//       const { speedId, distance } = doc.data();
//       speed.push({
//           key: doc.id,
//           doc, // DocumentSnapshot
//           speedId,
//           distance,
//         });
//     });
//     this.setState({ 
//       speed,
//       loading: false,
//    });
//    this.getDistance()
//     var sum = 0;
//     var numbers = this.state.distance;
//       for (var i = 0; i < numbers.length; i++) {
//         sum += Number.parseFloat(numbers[i],10)
//       }
//       this.setState({
//         sum : sum
//       }); 
// }


getDistance(){
var a=[] ;
this.state.speed.map(function(data , item){
  a.push(data.distance.toFixed(1));
});
this.setState({distance:a}); 

}
  render() {
    return (
      <View>
       <Text>{this.state.distance+","}</Text>
      <Text>{this.state.sum.toFixed(1)+","}</Text>
      </View>
    )
  }
}