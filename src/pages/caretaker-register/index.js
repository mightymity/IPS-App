import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import SearchPatient from "../../containers/search-patient"
import { Actions } from 'react-native-router-flux'

import { caretakerActions } from '../../actions'

export class caretakerRegist extends Component {
    state = {
        name: '',
        id: '',
        address: '',
        tel: '',
        patient: ''
    }

    saveNewCaretaker = () => {
        const { name, id, address, tel, patient } = this.state
        this.props.dispatch(caretakerActions.createNewCaretaker(id, name, patient));
        //Actions.jump('caretaker')
        Alert.alert(

            // This is Alert Dialog Title
            'Message',

            // This is Alert Dialog Message. 
            'Caretaker Added',
            [
                // First Text Button in Alert Dialog.
                { text: 'OK', onPress: () => this.goToCaretaker() }

            ]

        )
    }

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

    goToCaretaker = () => {
        Actions.jump('search_caretaker')
    }

    render() {
        const { name, id, address, tel, patient } = this.state
        return (
            <View style={{ alignSelf: 'stretch' }}>
        {/* <ScrollView>
          <SearchPatient />
        </ScrollView> */}
            <View style={{ padding: 30, alignSelf: 'center' }}>
                <Text style={local.heading1}> Registration </Text>

                    <TextInput value={name} style={local.textInput} placeholder="Name"
                        underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeName(value)} />

                    <TextInput value={id} style={local.textInput} placeholder="ID"
                        underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeId(value)} />

                    {/* <TextInput value={address} style={local.textInput} placeholder="Address"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeAddress(value)}/>

                    <TextInput value={tel} style={local.textInput} placeholder="Tel"
                    underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeTel(value)}/> */}

                    <TextInput value={patient} style={local.textInput} placeholder="Patient"
                        underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangePatient(value)} />

                    <TouchableOpacity style={local.button} onPress={() => { this.saveNewCaretaker() }}>
                        <Text style={local.btnText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={local.button} onPress={() => { this.goToCaretaker() }}>
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

export default connect(mapStateToProps)(caretakerRegist)
