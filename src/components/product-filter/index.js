import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";


// Custom component
import AppText from "../../components/app-text";
import Button from "../../components/custom-button";
import TitleIndicator from "../../components/title-indicator";

import { SegmentedControls } from 'react-native-radio-buttons'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import Modal from "react-native-modal";

class ProductFilter extends Component {
  state = {
    options: ['Price', 'Name'],
    selectedOption: this.props.sortType,
    indexOption: 0,
    showModal: false,
    newSortType: '',
  }

  _openModal(sortType) {
    this.setState({
      showModal: true,
      newSortType: sortType
    })
  }

  _closeModal() {
    this.setState({
      showModal: false
    })
  }

  _onSelect(index, value) {
    this._closeModal();
    this.setState({
      indexOption: index,
      selectedOption: this.state.newSortType // Fix
    });

    this.props.onChange(this.state.selectedOption, value);
  }

  render() {
    return (
      <View style={local.container}>
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={this.state.showModal}
          onBackButtonPress={() => this._closeModal()}
          onBackdropPress={() => this._closeModal()}>
          <View style={[local.customCard, global.modalContainer]}>
            <View style={local.modalTitle}>
              <TitleIndicator noBorder value="Order" />
            </View>
            <RadioGroup
              thickness={2}
              color={colors.greenB}
              selectedIndex={this.state.indexOption}
              onSelect={(index, value) => this._onSelect(index, value)}>
              <RadioButton
                value={'Ascending'}
                style={{ alignItems: 'center' }}>
                <AppText size="sm" value={'Ascending'} />
              </RadioButton>
              <RadioButton
                value={'Descending'}
                style={{ alignItems: 'center' }}>
                <AppText size="sm" value={'Descending'} />
              </RadioButton>
            </RadioGroup>
          </View>
        </Modal>
        <TitleIndicator value="Sort by" />
        <View style={[global.card, local.customCard]}>
          <SegmentedControls
            optionStyle={{ fontWeight: 'normal', fontFamily: 'Kanit-SemiBold' }}
            tint={colors.greenB}
            backTint={colors.whiteC}
            selectedTint={colors.whiteA}
            options={this.state.options}
            containerBorderWidth={0}
            onSelection={(value) => this._openModal(value)}
            selectedOption={this.state.selectedOption}
            renderOption={(option, selected) => {
              return (
                <View ref={option} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <AppText value={option} color={selected == true ? colors.whiteA : null} />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default ProductFilter;