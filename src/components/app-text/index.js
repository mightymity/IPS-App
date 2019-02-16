import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import { local } from "./style";

import { colors } from "../../theme";

class AppText extends Component {

  constructor(props) {
    super(props);

    this._checkSize();
  }

  _checkSize() {
    let size = null;
    switch (this.props.size) {
      case 'xxxl':
        size = 50;
        break;
      case 'xxl':
        size = 32;
        break;
      case 'xl':
        size = 22;
        break;
      case 'l':
        size = 18;
        break;
      case 'm':
        size = 16;
        break;
      case 'sm':
        size = 14;
        break;
      case 'xsm':
        size = 12;
        break;
      default:
        size = 16;
    }

    this.size = size;
  }

  render() {
    const bold = this.props.bold == true ? 'Kanit-SemiBold' : 'Kanit-Regular';
    const color = this.props.color == null ? colors.whiteF : this.props.color;
    const center = this.props.center == true ? { textAlign: 'center' } : null;
    const numLine = this.props.numLine == null ? 1 : this.props.numLine;
    const ellip = numLine == null ? null : 'tail';

    return (
      <Text 
        accessible={true}
        accessibilityLabel = {this.props.accessibilityLabel}
        numberOfLines={numLine}
        ellipsizeMode={ellip}
        style={[{
          fontFamily: bold,
          fontSize: this.size,
          color: color,
        }, center]} >
        {this.props.value}
      </ Text>
    );
  }
}

export default AppText;