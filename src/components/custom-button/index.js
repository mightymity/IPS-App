import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { local } from "./style";
import { colors } from "../../theme";

import AppText from "../app-text";

class Button extends Component {
  render() {
    let bgColor = this.props.bgColor == null ? colors.greenB : this.props.bgColor;
    let textColor = colors.whiteB;
    if (this.props.invert == true) {
      let temp = bgColor;
      bgColor = textColor;
      textColor = temp;
    }

    return (
      <TouchableOpacity
        style={[local.container,
        { backgroundColor: bgColor }]}
        onPress={() => { this.props.onPress() }}>
        <AppText
          value={this.props.value}
          size={this.props.size}
          color={textColor}
          bold center>
          {this.props.value}
        </AppText>
      </TouchableOpacity>
    );
  }
}

export default Button;