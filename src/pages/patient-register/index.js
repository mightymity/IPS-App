import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import {Actions} from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"

import { patientActions } from '../../actions'

import { db } from '../../firebase';


// let addItem = item => {  
//     db.ref('/patients').push({
//       name: item.name,
//       ble: item.ble,
//       gps: item.gps
//     });
//   };

export class patientRegist extends Component {
    confirm = () => {
        Actions.jump('Patient')
      }

    state = {
    id: '',
    name: '',
    ble: '',
    gps: ''
    }

    saveNewPatient = () => {
    //this.setState({avatar: '../../assets/images/default.png'})
    const { id, name, ble, gps} = this.state
    //addItem(this.state)
    this.props.dispatch(patientActions.createNewPatient(id, name, ble, gps));
    Alert.alert(
    
        // This is Alert Dialog Title
        'Message',
     
        // This is Alert Dialog Message. 
        'Patient Added',
        [
          // First Text Button in Alert Dialog.
          {text: 'OK'}
          
        ]
     
      )
    }

    onChangeId = (value) => {
    this.setState({ id: value })
    }

    onChangeName = (value) => {
    this.setState({ name: value })
    }

    onChangeBle = (value) => {
    this.setState({ ble: value });
    }

    onChangeGps = (value) => {
    this.setState({ gps: value });
    }


    render() {
        const { id, name, ble, gps } = this.state
        //const avatar = '../../assets/images/default.png'
        return (
            <View style={{alignSelf:'stretch'}}>
                <ScrollView>
                <SearchPatient />
                </ScrollView>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Registration </Text>

                    <TextInput value={id} style={local.textInput} placeholder="ID"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeId(value)}/>

                    <TextInput value={name} style={local.textInput} placeholder="Name"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeName(value)}/>

                    <TextInput value={ble} style={local.textInput} placeholder="BLE"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeBle(value)}/>

                    <TextInput value={gps} style={local.textInput} placeholder="GPS"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeGps(value)}/>

                    <TouchableOpacity style={local.button} onPress={() => {this.saveNewPatient()}}>
                    <Text style={local.btnText}>Confirm</Text>
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

export default connect(mapStateToProps)(patientRegist)
