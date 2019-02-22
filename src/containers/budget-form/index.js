import React, { Component } from 'react';
import {
  View,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

// Custom component
import AppText from "../../components/app-text";
import TitleIndicator from "../../components/title-indicator";
import Spinner from "react-native-spinkit";

class BudgetForm extends Component {
  state = {
    budgetValue: '',
    pcType: 'gaming',
  }

  _renderSubmitBtn() {

    if (this.props.isLoading == false) {
      return (
        <TouchableOpacity style={local.submitBtn}
          onPress={() => this.props.onGenerate(this.state.budgetValue, this.state.pcType)}>
          <AppText value="Submit" bold color={colors.whiteB} center />
        </TouchableOpacity>
      );
    } else {
      return (
        <Spinner
          style={local.spinner}
          type={"ThreeBounce"}
          size={40}
          color={colors.greenB} />
      );
    }
  }

  render() {
    return (
      <View style={local.container}>
        <TitleIndicator value="Preference" />
        <View style={[global.card, local.customCard]}>
          <View style={{ justifyContent: 'center' }}>
            <AppText bold size="xsm" value="PC Type" />
            <Picker
              style={local.picker}
              mode="dropdown"
              selectedValue={this.state.pcType}
              onValueChange={(itemValue, itemIndex) => this.setState({ pcType: itemValue })}>
              <Picker.Item label="Gaming" value="gaming" />
              <Picker.Item label="Designer" value="designer" />
            </Picker>
            <View style={local.pickerUnderline} />
            <AppText bold size="xsm" value="Budget (THB)" />
            <TextInput
              onSubmitEditing={() => this.props.onGenerate(this.state.budgetValue, this.state.pcType)}
              style={local.textInput}
              value={this.state.budgetValue}
              placeholder="25000"
              placeholderTextColor={colors.whiteE}
              onChangeText={(value) => this.setState({ budgetValue: value })} />
          </View>
          <View style={local.btnContainer}>
            {this._renderSubmitBtn()}
          </View>
        </View>

      </View>
    );
  }
}

export default BudgetForm;