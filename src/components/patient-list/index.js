import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { global } from '../../theme/style'
import { local } from './style'

export default class patientList extends Component {
  render() {
    const { name, ble, gps } = this.props;
    return (
      <View style={[local.container]}>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{ble}</Text>
        <Text>{gps}</Text>
      </View>
    )
  }
}
