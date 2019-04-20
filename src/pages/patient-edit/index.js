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
import Axios from 'axios';


export class patientEdit extends Component {
    confirm = () => {
        Actions.jump('Patient')
      }
    // const n = this.props.name
    // const b = this.props.ble
    // const g = this.props.gps
    state = {
    id: this.props.patients.current,
    ble: '',
    gps: '',
    // current: false,
    }

    editPatient = () => {
    //this.setState({avatar: '../../assets/images/default.png'})
    const { id, ble, gps} = this.state
    this.props.dispatch(patientActions.editPatientByIndex(id, ble, gps));
    this.props.dispatch(patientActions.selectEditPatient(null));
    //Actions.jump('patient')
    Alert.alert(
    
        // This is Alert Dialog Title
        'Message',
     
        // This is Alert Dialog Message. 
        'Edited',
        [
          // First Text Button in Alert Dialog.
          {text: 'OK', onPress: () => this.goBack()}
          
        ]
     
      )
      
    }

    setCurrentFalse = () => {
        this.props.dispatch(patientActions.selectEditPatient(null));
        this.goBack()
    }

    goBack = () =>{
        Actions.jump('patient');
    }

    // setCurrent = () => {
    // const updatedItem = state.map(item => {
    //     if(item.current === true){
    //         this.setState({name: item.name})
    //         this.setState({ble: item.ble})
    //         this.setState({gps: item.gps})
    //         this.setState({current: item.current})
    //         return item
    //     }
    //     return updatedItem })
    // }
        
    // }


    onChangeBle = (value) => {
    this.setState({ ble: value });
    }

    onChangeGps = (value) => {
    this.setState({ gps: value });
    }


    render() {
        // const {currrentIndex, data} = this.props.patients;

        // data[currrentIndex]
        const { ble, gps } = this.state
        // const result = patient.find(item => (item.current === true), this);
        // const { name, ble, gps, current} = result
        return (
            <View style={{alignSelf:'stretch'}}>
                <ScrollView>
                <SearchPatient />
                </ScrollView>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Edit </Text>

                    <TextInput value={ble} style={local.textInput} placeholder="BLE"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeBle(value)}/>

                    <TextInput value={gps} style={local.textInput} placeholder="GPS"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeGps(value)}/>

                    <TouchableOpacity style={local.button} onPress={() => {this.editPatient()}}>
                    <Text style={local.btnText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={local.button} onPress={() => {this.setCurrentFalse()}}>
                    <Text style={local.btnText}>Back</Text>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//     patientActions: () => dispatch(editPatientByIndex(ble,gps))
// }
// }

export default connect(mapStateToProps)(patientEdit)
