import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { global } from '../../theme'
import { colors } from '../../theme'

import { todoActions } from '../../actions'

export class index extends Component {

  state = {
    name: '',
    description: ''
  }

  saveNewTodo = () => {
    const { name, description } = this.state
    this.props.dispatch(todoActions.createNewTodo(name, description));
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  onChangeDescription = (value) => {
    this.setState({ description: value });
  }

  render() {
    const { name, description } = this.state
    return (
      <View style={global.pageContainer}>
        <View style={{ padding: 20, justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
          <Text> Create a new todo </Text>
          <TextInput value={name} placeholder="Name" underlineColorAndroid={colors.greenA}
            onChangeText={(value) => this.onChangeName(value)} />
          <TextInput value={description} placeholder="Description" underlineColorAndroid={colors.greenA}
            onChangeText={(value) => this.onChangeDescription(value)} />
          <Button title="Save" color={colors.greenC} onPress={() => this.saveNewTodo()} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
})


export default connect(mapStateToProps)(index)
