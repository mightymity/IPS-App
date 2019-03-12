import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global,colors } from '../../theme'

import TodoItem from '../../components/todo-item'

import Autocomplete from 'react-native-autocomplete-input'

export class Patient extends Component {
   

    render() {
        const { todos, } = this.props;
        
        
        return (
            <View style={global.pageContainer}>
                <Text>Patient</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
