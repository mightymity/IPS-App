import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';

// Custom Button
import AppText from "../app-text";
import Button from "../custom-button";

// Theme
import { local } from "./style";
import { colors, global } from "../../theme";

import { Actions } from "react-native-router-flux";

import { hook } from 'cavy'

class NavItem extends Component {
  state = {}
  render() {
    let itemColor;
    const tintColor = colors.purpleA;
    let active = this.props.active == null ? false : this.props.active;

    if (active) {
      itemColor = colors.whiteB;
    } else {
      itemColor = null;
    }

    return (
      <View>
        <StatusBar
          backgroundColor={colors.greenE}
          barStyle="light-content"
        />
        <TouchableOpacity onPress={() => this.props.onPress()}
          style={[local.navItem, { backgroundColor: itemColor }]}>
          <View style={global.colContent}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image
                style={[local.navItemIcon, { tintColor: tintColor }]}
                source={this.props.icon}></Image>
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <AppText size='sm' value={this.props.name} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class SideMenu extends Component {
  state = {}
  render() {
    return (
      <View style={local.container}>
        <View style={local.menuTitleContainer}>
          <AppText value="Menu" size="l" />
        </View>
        {/* <NavItem name="Home" onPress={() => { Actions.jump('home') }}
          icon={require('../../assets/icons/build.png')} />
        <NavItem name="Create Todo" onPress={() => { Actions.jump('create_todo') }}
          icon={require('../../assets/icons/save.png')} /> */}

          <NavItem name="BLE" onPress={() => { Actions.jump('tf') }}
          icon={require('../../assets/icons/ble.png')} />
          <NavItem name="GPS" onPress={() => { Actions.jump('tf2') }}
          icon={require('../../assets/icons/gps.png')} />
          <NavItem name="Patient" onPress={() => { Actions.jump('search_patient') }}
          icon={require('../../assets/icons/patient.png')} />
          <NavItem name="Caretaker" onPress={() => { Actions.jump('search_caretaker') }}
          icon={require('../../assets/icons/caretaker.png')} />
          {/* <NavItem name="Edit Map" onPress={() => { Actions.jump('edit-map') }}
          icon={require('../../assets/icons/save.png')} /> */}
          {/* <NavItem name="BLE" onPress={() => { Actions.jump('tf') }}
          icon={require('../../assets/icons/ble.png')} />
          <NavItem name="GPS" onPress={() => { Actions.jump('tf2') }}
          icon={require('../../assets/icons/gps.png')} /> */}
          <NavItem name="Logout" onPress={() => { Actions.jump('login') }}
          icon={require('../../assets/icons/logout.png')} />

      </View>
    );
  }
}

export default hook(SideMenu);