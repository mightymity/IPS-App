import React, { Component } from 'react';
import { View, TextInput, Picker, TouchableOpacity, Image, Text, FlatList } from 'react-native';

import { local } from "./style";
import { colors, global } from "../../theme";

// Custom component
import AppText from "../../components/app-text";
import TitleIndicator from "../../components/title-indicator";

import buildings from '../../services/demo_buildings'
import { ListItem } from "react-native-elements";

import { connect } from 'react-redux'


class NewIndoorMap extends Component {
  state = {
    buildings: buildings,
    name: buildings.name,
    nameIndex: 0,
    floorsIndex:0,
    floorsNo: buildings && buildings.floors ? buildings.floors.number : null
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  filteredPatient = () =>{

  }


  render() {
    const { name, floorsNo, } = this.state;
    const black = '#000000';


    return (

      <View style={[local.container, local.card, local.customCard]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '' }}>
          <AppText size="xxl" value="Overview" center bold color={black} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', }}>
          <View style={{ flex: 3, justifyContent: 'center' }}>

            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={name}
              onValueChange={(item, index) => this.setState({ name: item, nameIndex : index})}>

              {this.state.buildings.map((item, index) => (
                <Picker.Item label={item.name} value={item.name} style={{ fontSize: 16 }} />
              ))}
              

            </Picker>
            <View style={local.pickerUnderline} />
          </View>

          <View style={{ flex: 1, justifyContent: 'center' }}>

            <Picker
              style={local.x}
              mode="dropdown"
              selectedValue={floorsNo}
              onValueChange={(item,index) => this.setState({ floorsNo: item, floorsIndex: index })}>

              {this.state.buildings[this.state.nameIndex].floors.map(item => (
                <Picker.Item label={item.number} value={item.number} style={{ fontSize: 16 }} />
              ))}

            </Picker>
            <View style={local.pickerUnderline} />

          </View>
        </View>

        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
          <Image resizeMode='center' style={{ width:800, height:400}} source={this.state.buildings[this.state.nameIndex].floors[this.state.floorsIndex].img}></Image>
        </View>

        {/* <View style = {{justifyContent:'center', alignItems: 'center'}}>

        <FlatList
          data={this.state.filteredData2}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={`${item.name} ${item.last}`}
              subtitle={item.email}
              //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => {}}
            />
          )}
        />

        </View> */}

      </View>

    );
  }
}


const mapStateToProps = (state) => ({
  ble: state.ble
});
const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(NewIndoorMap);