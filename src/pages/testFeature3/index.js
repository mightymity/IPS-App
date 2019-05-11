import React, { Component } from 'react'
import {
  View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator
  , Image, StyleSheet
} from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import { Actions } from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"

import { patientActions } from '../../actions'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';




// let addItem = item => {  
//     db.ref('/patients').push({
//       name: item.name,
//       ble: item.ble,
//       gps: item.gps
//     });
//   };

export class testMap extends Component {
  // constructor(props) {
  //   super(props);

  //   const { dispatch } = props;
  //   dispatch(patientActions.updatePatientList())
  // }

  // markerStyle = function(){
  //   return {
  //       margin: 50,
  //       position: "absolute",
  //       top: 70,
  //       left: 125,
  //       width: 25,
  //       height: 25,
  //       color: "tomato"
  //   }
  // }  


  // top: 460 left: 690
  state = {
    top: 70,
    left: 125,
    selected: 1
  }


  onOnePress = () => {
    this.setState({ top: 70 })
    this.setState({ left: 125 })
  }

  onTwoPress = () => {
    this.setState({ top: 70 })
    this.setState({ left: 300 })
  }

  onThreePress = () => {
    this.setState({ top: 70 })
    this.setState({ left: 600 })
  }

  onFourPress = () => {
    this.setState({ top: 210 })
    this.setState({ left: 125 })
  }

  onFivePress = () => {
    this.setState({ top: 210 })
    this.setState({ left: 300 })
  }

  onSixPress = () => {
    this.setState({ top: 210 })
    this.setState({ left: 600 })
  }

  onSevenPress = () => {
    this.setState({ top: 400 })
    this.setState({ left: 125 })
  }

  onEightPress = () => {
    this.setState({ top: 400 })
    this.setState({ left: 300 })
  }

  onNinePress = () => {
    this.setState({ top: 400 })
    this.setState({ left: 600 })
  }



  render() {
    const { top, left } = this.state
    return (
      <View>
      <View style={{ alignSelf: 'center' }}>
        <Image
          //resizeMode="cover"
          //style={local.cover}
          //source={{ uri: "https://picsum.photos/700" }}
          source={require('../../assets/images/artgrid.jpg')}
        />
        <Ionicons style={{
          margin: 50,
          position: "absolute",
          // top: 70,
          // left: 125,
          width: 25,
          height: 25,
          color: "tomato",
          top: top,
          left: left
        }} name="ios-close-circle" size={25} />
        </View>
        {/* <TextInput value={this.selected} style={local.textInput} placeholder="-"
          underlineColorAndroid={'transparent'} onChangeText={val => this.setState({ selected: val })} /> */}
        <View style={{flexDirection:'row', alignSelf:'center'}}>
        <TouchableOpacity style={local.button} onPress={() => { this.onOnePress() }}>
          <Text style={local.btnText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onTwoPress() }}>
          <Text style={local.btnText}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onThreePress() }}>
          <Text style={local.btnText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={local.button} onPress={() => { this.onFourPress() }}>
          <Text style={local.btnText}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onFivePress() }}>
          <Text style={local.btnText}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onSixPress() }}>
          <Text style={local.btnText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={local.button} onPress={() => { this.onSevenPress() }}>
          <Text style={local.btnText}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onEightPress() }}>
          <Text style={local.btnText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={local.button} onPress={() => { this.onNinePress() }}>
          <Text style={local.btnText}>9</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  patients: state.patients,
  caretakers: state.caretakers
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(testMap)