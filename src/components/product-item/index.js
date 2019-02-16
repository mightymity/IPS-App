import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";


// Custom component
import AppText from "../../components/app-text";
import Button from "../../components/custom-button";


class ProductItem extends PureComponent {
  _renderAddBtn(name) {
    if (this.props.showAddBtn == true) {
      return (
        <TouchableOpacity style={local.addButton} onPress={() => { this.props.onAdd() }} >
          <AppText value="Add" size="xsm" bold color={colors.whiteB} />
        </TouchableOpacity>
      );
    } else { return null; }
  }

  render() {
    return (
      <View style={[global.listItem, local.container]}>
        <View style={local.imageContainer}>
          <Image style={local.image}
            resizeMethod="resize"
            source={{ uri: this.props.image }}>
          </Image>
        </View>
        <TouchableOpacity activeOpacity={0.5}
          onPress={() => { this.props.onPress() }} style={local.detailContainer}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <AppText numLine={2} size="sm" bold value={this.props.name} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={[global.centerVertical, { flex: 1 }]}>
              <AppText value={this.props.price + " THB"} size="m" color={colors.greenB} />
            </View>
            <View style={[global.centerVertical]}>
              {this._renderAddBtn(this.props.name)}
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

export default ProductItem;
