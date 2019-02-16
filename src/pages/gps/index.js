import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'

export class GPS extends Component {

    render() {
        const { todos } = this.props;
        return (
            <View style={global.pageContainer}>
                 <Text>GPS</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GPS)
