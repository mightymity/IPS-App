import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";


// Custom component
import AppText from "../app-text";
import Button from "../custom-button";


class RecommendSpec extends Component {
  state = {}
  render() {
    return (
      <View style={local.container}>
        <TouchableOpacity onPress={() => this.props.onPress()} >
          <View style={[global.colContent, { flex: 1 }]}>
            <View style={local.id}>
              <AppText value={this.props.id} size={"xl"} bold />
            </View>
            <View style={local.detail}>
              <View style={[global.colContent,local.scoreContainer]}>
                <View style={local.scoreTitle}>
                  <AppText value="Price : " />
                </View>
                <View style={local.priceContainer}>
                  <AppText value={this.props.price + " THB"} bold color={colors.greenA} />
                </View>
              </View>



            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RecommendSpec;