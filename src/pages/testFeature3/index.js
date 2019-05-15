import React, { Component } from 'react'
import {
  View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator
  , Image, StyleSheet
} from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AppText from '../../components/app-text'

export class TestFeature3 extends Component {

  state = {
    top: 70,
    left: 125,
    selected: 1
  }

  render() {
    const black = '#000000'
    return (
      <View style={[local.card, { flexDirection: 'row', alignItems: 'center', }]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '' }}>
            <AppText size="l" value="58090042      Sivut Mekareeya" center bold color={black} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '' }}>
            <TouchableOpacity onPress={() => { }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 15 }}>
                  <Icon name="times" size={23} />
                </View>
                <View>
                  <AppText size="l" value="Cancel" center bold color={black} />
                </View>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '' }}>
            <TouchableOpacity onPress={() => { }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 15 }}>
                  <Icon name="search" size={23} />
                </View>
                <View>
                  <AppText size="l" value="Search for BLE patient..." center bold color={black} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
}

export default TestFeature3