import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import SearchPatient from "../../containers/search-patient"
import {Actions} from 'react-native-router-flux'

export class Home extends Component {

    confirm = () => {
        Actions.jump('caretaker')
      }
    render() {
        //const { todos } = this.props;
        return (
            <View style={{alignSelf:'stretch'}}>
                <ScrollView>
                <SearchPatient />
                </ScrollView>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Registration </Text>

                    <TextInput style={local.textInput} placeholder="Name"
                    underlineColorAndroid={'transparent'} />

                    <TextInput style={local.textInput} placeholder="BLE"
                    underlineColorAndroid={'transparent'} />

                    <TextInput style={local.textInput} placeholder="GPS"
                    underlineColorAndroid={'transparent'} />

                    <TouchableOpacity style={local.button} onPress={() => {this.confirm()}}>
                    <Text style={local.btnText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                
                
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
