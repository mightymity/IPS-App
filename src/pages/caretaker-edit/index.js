import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import {Actions} from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"

import { caretakerActions } from '../../actions'
import Axios from 'axios';

export class caretakerEdit extends Component {
    confirm = () => {
        Actions.jump('caretaker')
      }
    // const n = this.props.name
    // const b = this.props.ble
    // const g = this.props.gps
    state = {
        name: '',
        id: this.props.caretakers.current,
        address: '',
        tel: '',
        patient: '',
        current: '',
    }

    editCaretaker = () => {
    //this.setState({avatar: '../../assets/images/default.png'})
    const { name, id, address, tel, patient, current} = this.state
    this.props.dispatch(caretakerActions.editCaretakerByIndex(id, name, patient));
    this.props.dispatch(caretakerActions.selectEditCaretaker(null));
    //Actions.jump('caretaker')
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

    setCurrentNull = () => {
        this.props.dispatch(caretakerActions.selectEditCaretaker(null));
        this.goBack()
    }

    goBack = () =>{
        Actions.jump('caretaker');
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


    onChangeName = (value) => {
    this.setState({ name: value })
    }

    onChangeId = (value) => {
    this.setState({ id: value });
    }

    onChangeAddress = (value) => {
    this.setState({ address: value });
    }
    
    onChangeTel = (value) => {
    this.setState({ tel: value });
    }
    onChangePatient = (value) => {
    this.setState({ patient: value });
    }


    render() {
        // const {currrentIndex, data} = this.props.patients;

        // data[currrentIndex]
        
        const { name, id, address, tel, patient } = this.state
        // const result = patient.find(item => (item.current === true), this);
        // const { name, ble, gps, current} = result
        return (
            <View style={{alignSelf:'stretch'}}>
                <ScrollView>
                <SearchPatient />
                </ScrollView>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Edit </Text>

                    <TextInput value={name} style={local.textInput} placeholder="Name"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeName(value)}/>

                    {/* <TextInput value={id} style={local.textInput} placeholder="ID"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeId(value)}/>

                    <TextInput value={address} style={local.textInput} placeholder="Address"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeAddress(value)}/>

                    <TextInput value={tel} style={local.textInput} placeholder="Tel"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeTel(value)}/> */}

                    <TextInput value={patient} style={local.textInput} placeholder="Patient"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangePatient(value)}/>

                    <TouchableOpacity style={local.button} onPress={() => {this.editCaretaker()}}>
                    <Text style={local.btnText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={local.button} onPress={() => {this.setCurrentNull()}}>
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

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(caretakerEdit)
