import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import { global } from '../../theme/style'
import { local } from './style'
import { Col, Row, Grid } from "react-native-easy-grid";


export default class patientList extends Component {
  render() {
    const { id, name, ble, gps } = this.props;
    return (
      <View style={[local.container]}>
        <View style={local.SectionStyle}>
          <Image style={[local.ImageStyle]} source={require('../../assets/icons/account.png')}></Image>
          <Text style={{ fontWeight: 'bold',flex: 2}}>{name}</Text>
        
          <View style={{flex:2}}>
          <Text>BLE: {ble}     ID: {id}       GPS: {gps}</Text>
          {/* <Text>GPS: {gps}</Text> */}
          </View>
        </View>
      </View>
    )
  }
}
