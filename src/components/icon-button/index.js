import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { local } from "./style";
import { colors } from "../../theme";

import AppText from "../app-text";

import { hook } from 'cavy'

class IconButton extends Component {
  render() {
    const iconSize = this.props.size == "sm" ? { width: 24, height: 24 } : { width: 32, height: 32 };

    return (
      <TouchableOpacity
        ref={this.props.generateTestHook('Hamburger.button')}  
        style={local.container}
        onPress={() => { this.props.onPress() }}>
        <Image style={[local.icon, iconSize]} source={this.props.imgPath}>
        </Image>
      </TouchableOpacity>
    );
  }
}

export default hook(IconButton);
