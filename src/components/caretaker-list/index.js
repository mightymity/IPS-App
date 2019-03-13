import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { global } from '../../theme/style'
import { local } from './style'

export default class caretakerList extends Component {
  render() {
    const { name, id, address, tel, patient } = this.props;
    return (
      <View style={[local.container]}>
        <View style={local.SectionStyle}>
        <Image style={[local.ImageStyle]} source={require('../../assets/images/default.png')}></Image>
        <Text style={{ fontWeight: 'bold', flex: 2 }}>{name}</Text>
        {/* <Text>{id}</Text>
        <Text>{address}</Text>
        <Text>{tel}</Text> */}
        <View style={{flex:2}}>
        <Text>Patient: </Text>
        <Text>{patient}</Text>
        </View>
        </View>
      </View>
    )
  }
}
