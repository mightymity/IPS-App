import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

import AppText from '../app-text';
import TitleIndicator from '../title-indicator';


class SelectComponent extends Component {

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[local.select, global.card]}
        onPress={() => this.props.onPress()}>
        <AppText value={this.props.title} size="l" bold />
      </TouchableOpacity>
    );
  }
}

class SelectComponentList extends Component {

  render() {
    const bgColor = this.props.bgColor == null ? colors.greenB : this.props.bgColor;
    return (
      <View style={local.container}>
        <TitleIndicator value="Select component" />
        <View style={global.colContent}>
          <SelectComponent title="CPU" onPress={() => { this.props.onSelect("CPU", 'cpu') }} />
          <SelectComponent title="Mainboard" onPress={() => { this.props.onSelect("Mainboard", "mainboard") }} />
        </View>

        <View style={global.colContent}>
          <SelectComponent title="GPU" onPress={() => { this.props.onSelect("GPU", "gpu") }} />
          <SelectComponent title="Harddisk" onPress={() => { this.props.onSelect("Harddisk", "harddisk") }} />
        </View>

        <View style={global.colContent}>
          <SelectComponent title="SSD" onPress={() => { this.props.onSelect("SSD", "ssd") }} />
          <SelectComponent title="RAM" onPress={() => { this.props.onSelect("RAM", "ram") }} />
        </View>

        <View style={global.colContent}>
          <SelectComponent title="Power Supply" onPress={() => { this.props.onSelect("Power Supply", "powersupply") }} />
          <SelectComponent title="Monitor" onPress={() => { this.props.onSelect("Monitor", "monitor") }} />
        </View>

      </View>
    );
  }
}

export default SelectComponentList;