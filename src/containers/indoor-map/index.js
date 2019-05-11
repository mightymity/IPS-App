import React, { Component } from 'react';
import {
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

// Custom component
import AppText from "../../components/app-text";
import TitleIndicator from "../../components/title-indicator";


class IndoorMap extends Component {
  state = {
    buildings: this.props.buildings,
    name: this.props.buildings.name,
    nameIndex: 0,
    floorsIndex:0,
    floors: this.props.buildings && this.props.buildings.floors ? this.props.buildings.floors : null,
    floorsNo: this.props.buildings && this.props.buildings.floors ? this.props.buildings.floors.number : null
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  checkBuilding = (name) => {

    // this.state.buildings.map(item => {
    //   if(item.name == name){
    //     this.setState({floors: item.floors})
    //   }
    // })

    // for (let i in array) {

    // }

  }


  selectFloor = (name) => {

  }

  render() {
    const { name, floors, floorsNo, } = this.state;
    const black = '#000000';
    const img = this.state.buildings[0].floors[0].img


    return (

      <View style={[local.container, local.card, local.customCard]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '' }}>
          <AppText size="xxl" value="Overview" center bold color={black} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', }}>
          <View style={{ flex: 3, justifyContent: 'center' }}>
            {/* <Picker
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
            <View style={local.pickerUnderline} /> */}

            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={name}
              onValueChange={(itemValue, index) => this.setState({ name: itemValue, nameIndex : index})}>

              {this.state.buildings.map((item, index) => (
                <Picker.Item label={item.name} value={item.name} style={{ fontSize: 16 }} />
              ))}
              
              {/* <Picker.Item label="IC Building" value="ic" style={{fontSize:16}}/>
              <Picker.Item label="ECC" value="ecc" style={{fontSize:16}}/> */}

            </Picker>
            <View style={local.pickerUnderline} />
          </View>

          <View style={{ flex: 1, justifyContent: 'center' }}>

            {/* {this.state.buildings.map(item => {
              if (item.name == name) {
                this.setState({ floors: item.floors })
              }
            })} */}

            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={floorsNo}
              onValueChange={(itemValue,index) => this.setState({ floorsNo: itemValue, floorsIndex: index })}>

              {this.state.buildings[this.state.nameIndex].floors.map(item => (
                <Picker.Item label={item.number} value={item.number} style={{ fontSize: 16 }} />
              ))}

            

              {/* <Picker.Item label="Floor 6" value="6" style={{fontSize:16}}/>
              <Picker.Item label="Floor 8" value="8" style={{fontSize:16}}/> */}
            </Picker>
            <View style={local.pickerUnderline} />

          </View>
        </View>

        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
          {/* <Image resizeMode='contain' source={require('../../assets/images/MorgantownMall.png')}></Image> */}
          {/* <Text>{img}</Text>    width:800, height:400*/} 
          <Image resizeMode='center' style={{ width:1500, height:420}} source={this.state.buildings[this.state.nameIndex].floors[this.state.floorsIndex].img}></Image>
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