import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

import AppText from "../app-text";


class PreferenceItem extends Component {
  render() {
    return (
      <View style={[global.card, local.container]}>
        <TouchableOpacity onPress={() => { this.props.onPress() }}>
          <View style={local.imageContainer}>
            <Image style={local.image}
              source={{ uri: this.props.image }}>
            </Image>
            <TouchableOpacity onPress={() => { this.props.onDelete() }} style={local.closeContainer} >
              <Image style={local.closeIcon} source={require('../../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>
          <View style={local.detailContainer}>

            <View style={local.nameContainer}>
              <View style={{ flex: 1 }}>
                <Text style={local.titleText} numberOfLines={2}
                  ellipsizeMode='tail'>{this.props.name}</Text>
              </View>
            </View>

            <View>
              <View style={global.centerVertical}>
                <AppText value={this.props.price + " THB"} size="m" bold color={colors.greenB} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

export default PreferenceItem;