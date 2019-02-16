import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addToFavorite } from "../../actions/favorite-specs";

//Component
import AppText from "../../components/app-text";
import Button from "../../components/custom-button";
import FavoriteComponent from "../../components/favorite-component";
import ProductItem from '../../components/product-item';
import Modal from "react-native-modal";
import TitleIndicator from "../../components/title-indicator";

class SpecDetail extends Component {
  state = {
    specName: "",
    showInputName: false,
  }

  _navigateToDetail(data) {
    Actions.push('Product-detail', {
      product: data
    })
  }

  _saveThisSpec() {
    this._closeModal();
    const spec = { components: this.components }
    this.props.addToFavorite(
      spec,
      this.state.specName,
      this.props.mode
    );
    ToastAndroid.show('Save to favorite', ToastAndroid.SHORT);
    Actions.pop();
  }

  _openInputModal() {
    this.setState({
      showInputName: true
    })
  }

  _closeModal() {
    this.setState({
      showInputName: false
    })
  }

  _renderItems() {
    const spec = this.props.spec;
    this.components = Object.values(spec);

    return (
      <FlatList
        data={this.components}
        renderItem={({ item }) =>
          <ProductItem
            hideAddBtn
            name={item.Title}
            price={item.Price}
            image={item.ImgURL}
            onPress={() => this._navigateToDetail(item)}
            onAdd={() => { }}>
          </ProductItem>}
        keyExtractor={item => item.Title}
      />
    );
  }

  _renderModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.state.showInputName}
        onBackButtonPress={() => this._closeModal()}
        onBackdropPress={() => this._closeModal()}>
        <View style={global.modalContainer}>
          <View style={local.modalTitle}>
            <TitleIndicator noBorder value="Input a name of your spec" />
          </View>
          <TextInput
            autoFocus
            maxLength={20}
            style={local.textInput}
            value={this.state.specName}
            selectionColor={colors.greenB}
            underlineColorAndroid={colors.greenB}
            placeholder="Optimal spec"
            placeholderTextColor={colors.whiteE}
            onSubmitEditing={(value) => { this._saveThisSpec() }}
            onChangeText={(value) => this.setState({ specName: value })} />
          <View style={local.confirmContainer}>
            <TouchableOpacity style={local.confirmBtn} onPress={() => this._saveThisSpec()} >
              <AppText size="sm" value="OK" center bold color={colors.whiteB} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={global.pageContainer}>
        {this._renderModal()}
        <ScrollView contentContainerStyle={[global.pageScrollView]}>
          {this._renderItems()}
        </ScrollView>
        <View style={{ position: "absolute", bottom: 10, right: 10 }}>
          <TouchableOpacity activeOpacity={0.5} style={local.saveBtn} onPress={() => { this._openInputModal() }} >
            <Image style={local.saveIcon} source={require('../../assets/icons/save.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


// export default connect(null, mapDispatchToProps)(SpecDetail);
const TestSpecDetail = connect(null, mapDispatchToProps)(SpecDetail);
export default TestSpecDetail;