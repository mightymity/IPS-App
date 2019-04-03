import React, { Component } from 'react';
import {
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  Image
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

// Custom component
import AppText from "../../components/app-text";
import TitleIndicator from "../../components/title-indicator";


class IndoorMap extends Component {
  state = {
    building: 'ic',
    floor: '6',
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  render() {
    const { building, floor } = this.state;
    const black = '#000000';

    return (

      <View style={[local.container, local.card, local.customCard]}>
        <View style={{ flex: 1,justifyContent:'center', alignItems: 'flex-start', backgroundColor: ''}}>
          <AppText size="xxl" value="Overview" center bold color={black} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '',}}>
          <View style={{ flex: 3, justifyContent: 'center'}}>
            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={this.state.building}
              onValueChange={(itemValue, itemIndex) => this.setState({ building: itemValue })}>
              <Picker.Item label="IC Building" value="ic" style={{fontSize:16}}/>
              <Picker.Item label="ECC" value="ecc" style={{fontSize:16}}/>
            </Picker>
            <View style={local.pickerUnderline} />
          </View>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={this.state.floor}
              onValueChange={(itemValue, itemIndex) => this.setState({ floor: itemValue })}>
              <Picker.Item label="Floor 6" value="6" style={{fontSize:16}}/>
              <Picker.Item label="Floor 8" value="8" style={{fontSize:16}}/>
            </Picker>
            <View style={local.pickerUnderline} />
          </View>
        </View>

        <View style={{ flex: 8 , justifyContent:'center', alignItems:'center', backgroundColor: ''}}>
          <Image resizeMode='contain' source={require('../../assets/images/MorgantownMall.png')}></Image>
        </View>

      </View>

    );
  }
}


const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});


export default IndoorMap;