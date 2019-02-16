import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { global } from '../../theme/style'
import { local } from './style'

export default class TodoItem extends Component {
  render() {
    const { name, description } = this.props;
    return (
      <View style={[global.card, local.container]}>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{description}</Text>
      </View>
    )
  }
}
