import React, { Component } from 'react';
import {
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

import { local } from "./style";
import { colors, global } from "../../theme";

// Custom component
import AppText from "../../components/app-text";
import TitleIndicator from "../../components/title-indicator";


class SearchPatient extends Component {
  state = {
    name: '',
    patients: this.props.patientss,
    selectedPatient: this.props.patientss[0]
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  filterData = (query) => {
    if(query === ""){
      return []
    }

    else{
    filteredData = this.props.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })

    return filteredData
    }
  }

  render() {
    const { name } = this.state;
    const black = '#000000';
    const data = this.filterData(name)
    return (
      <View style={[local.container, { backgroundColor: '' }]}>
        <View style={[local.card, local.customCard]}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 4, justifyContent: 'center'}}>
              {/* <TextInput
                value={name}
                placeholder="Search patient"
                underlineColorAndroid={colors.greenA}
                onChangeText={(value) => this.onChangeName(value)} /> */}

              <Autocomplete
                data={data}
                defaultValue={name}
                onChangeText={text => this.setState({ name: text })}
                renderItem={item => (
                  <TouchableOpacity onPress={() => this.setState({ name : item.name })}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />

            </View>
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '' }}>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 5, }}>
                <AppText size="l" value="John Snow" center color={black} />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/images/talin.png')} style={{ width: 45, height: 45, borderRadius: (50 / 2), }}></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SearchPatient;