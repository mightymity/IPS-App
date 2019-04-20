import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'

import { Actions } from 'react-native-router-flux'

export class EditMap extends Component {

    render() {
        const { todos } = this.props;
        return (
            <View style={global.pageContainer}>
                 <Text>Edit Map</Text>
                 <View>
                    <Text onPress={()=>{Actions.jump('realSearch')}}>
                        go search
                    </Text>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMap)
