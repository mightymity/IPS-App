import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'

export class Home extends Component {

    render() {
        const { todos } = this.props;
        return (
            <View style={global.pageContainer}>
                <View style={{ padding: 5 }}>
                    <Text style={local.heading1}> Todos </Text>
                </View>
                <FlatList data={todos} renderItem={({ item, index }) =>
                    <TodoItem name={item.name} description={item.description} />
                } />
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
