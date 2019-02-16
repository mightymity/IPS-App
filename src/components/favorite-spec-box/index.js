import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";
import AppText from "../app-text";


class FavoriteSpecBox extends Component {

  _modeCheck(mode) {
    if (mode == "Manual") {
      return (
        <View style={local.modeIcon} backgroundColor={colors.redA} >
          <AppText value="M" bold size={"l"} color={colors.whiteA} />
        </View>
      );
    }
    else if (mode == "Auto") {
      return (
        <View style={local.modeIcon} backgroundColor={colors.blueA}>
          <AppText value="A" bold size={"l"} color={colors.whiteA} />
        </View>
      );
    }
  }


  render() {
    return (
      <View style={[global.listItem, local.container]}>
        <TouchableOpacity onPress={() => { this.props.onPress() }}>
          <View style={local.partition}>
            <View style={local.section1}>
              <View style={local.sectionName}>
                <AppText value={this.props.name} bold size={"xl"} />
              </View>
              <View style={local.sectionPrice}>
                <AppText color={colors.greenB} bold value={this.props.price} size={"l"} />
              </View>
            </View>

            <View style={local.section2}>
              <View style={local.sectionMode}>
                {this._modeCheck(this.props.mode)}
              </View>
              <View style={local.sectionDate}>
                <AppText value={this.props.date} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}



export default FavoriteSpecBox;