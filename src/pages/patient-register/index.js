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

export class patientRegist extends Component {
    confirm = () => {
        Actions.jump('Patient')
      }

    state = {
    name: '',
    ble: '',
    gps: ''
    }

    saveNewPatient = () => {
    const { name, ble, gps } = this.state
    this.props.dispatch(patientActions.createNewPatient(name, ble, gps));
    Alert.alert(
    
        // This is Alert Dialog Title
        'Add',
     
        // This is Alert Dialog Message. 
        'Added',
        [
          // First Text Button in Alert Dialog.
          {text: 'OK'}
          
        ]
     
      )
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
        const { name, ble, gps } = this.state
        return (
            <View style={{alignSelf:'stretch'}}>
                <ScrollView>
                <SearchPatient />
                </ScrollView>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Registration </Text>

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
    patients: state.patients
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(patientRegist)
