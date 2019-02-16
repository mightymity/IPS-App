import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from 'react-native';

import { Actions } from "react-native-router-flux";

import { local } from "./style";
import { colors, global } from "../../theme";

import AppText from '../app-text';

class TabItem extends Component {
  render() {
    const activeColor = this.props.active == true ? colors.whiteB : colors.whiteF;
    return (
      <View style={local.tabItem}>
        <TouchableOpacity activeOpacity={0.5} style={{ flex: 1 }}
          onPress={() => { this.props.onPress() }}>
          <View style={local.innerTabView}>
            <Image style={[local.tabIcon, { tintColor: activeColor }]} source={this.props.icon}></Image>
            <AppText
              size="xsm"
              value={this.props.text}
              color={activeColor} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class TabBar extends Component {
  _renderTabItems() {
    let key = 0;
    return this.props.childNames.map((name) => {
      let iconPath = null;
      if (name == 'Auto') {
        iconPath = require('../../assets/icons/ai.png');
      } else if (name == 'Manual') {
        iconPath = require('../../assets/icons/build.png');
      }

      return (
        <TabItem 
          icon={iconPath}
          key={key++}
          style={local.tabItem}
          text={name}
          active={Actions.currentScene == '_' + name}
          onPress={() => { this.props.navigation.navigate(name) }} />
      );
    })
  }

  render() {
    return (
      <View style={local.container}>
        {this._renderTabItems()}
      </View>
    );
  }
}

export default TabBar;

