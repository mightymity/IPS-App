import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";


import AppText from "../../components/app-text";
import Button from "../../components/custom-button";



class FavoriteComponent extends Component {
  render() {
    return (
      <View style={[global.listItem, local.container]}>
        <View style={local.imageContainer}>
          <Image style={local.image}
            source={{ uri: this.props.image }}>
          </Image>
        </View>
        <TouchableOpacity onPress={() => { this.props.onPress() }} style={local.detailContainer}>
          <View style={{ flex: 1 , justifyContent: 'center'}}>
            <AppText numLine={2} size="sm" bold value={this.props.name} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={[global.centerVertical, { flex: 1 }]}>
              <AppText value={this.props.price + " THB"} size="m" bold color={colors.greenB} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', backgroundColor: colors.whiteB }}>
              <View style={local.cartButtonContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { this.props.onCart() }}>
                  <Image style={local.cartIcon} source={require('../../assets/icons/cart2.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={local.bagButtonContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { this.props.onStore() }}>
                  <Image style={local.storeIcon} source={require('../../assets/icons/store.png')}></Image>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

export default FavoriteComponent;