import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { global } from '../../theme/style'
import { local } from './style'

export default class caretakerList extends Component {
  render() {
    const { name, id, address, tel, patient } = this.props;
    return (
      <View style={[global.card, local.container]}>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{id}</Text>
        <Text>{address}</Text>
        <Text>{tel}</Text>
        <Text>{patient}</Text>
      </View>
    )
  }
}
