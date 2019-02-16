import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

import AppText from "../app-text";

const excludeAttr = ['ImgURL', 'CartURL', 'Title', 'Price', 'ComponentType', 'requestName'];

class DetailBox extends Component {

  _decorateKey(str) {
    str = str.replace(/_/g, ' ');
    return str[0].toUpperCase() + str.slice(1);
  }

  _renderRow() {
    let product = this.props.product;
    let keys = Object.keys(product);
    const views = [];

    for (let key of keys) {
      if (excludeAttr.includes(key)) continue; // Exlude from detail box
      if (key == 'CPU_Series') { key = key.toString(); } // show in array format

      views.push(
        <View style={local.attrRow} key={key}>
          <View style={local.keyName}>
            <AppText value={this._decorateKey(key) + ' :'} size="m" bold />
          </View>
          <View style={local.value}>
            <AppText value={product[key]} numLine={5} />
          </View>
        </View>
      );
    }

    return views;

  }

  render() {
    const bgColor = this.props.bgColor == null ? colors.greenB : this.props.bgColor;
    const round = this.props.round == null ? null : { borderRadius: 20 };
    return (
      <View style={global.card}>
        {this._renderRow()}
      </View>
    );
  }
}

export default DetailBox;