import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { local } from "./style";
import { colors } from "../../theme";

// Custom component
import AppText from "../../components/app-text";

class TitleIndicator extends Component {

  render() {
    const size = this.props.size == null ? null : this.props.size;
    const textColor = this.props.invert == true ? colors.whiteB : null;
    const noBorder = this.props.noBorder == true ? 0 : 4;
    let padLeft = 5;
    if (this.props.noBorder == true) { padLeft = 0; }
    return (
      <View style={[local.container, {
        borderLeftWidth: noBorder,
        borderColor: colors.greenB,
        paddingLeft: padLeft
      }]}>
        <AppText value={this.props.value} color={textColor} bold size={size} />
      </View>
    );
  }
}

export default TitleIndicator;