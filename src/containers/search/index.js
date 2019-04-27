import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import { selectPatientToTrackBle, collectSelectedPatientDataBle } from '../../actions/ble.action'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";


class Search extends Component {

  constructor(props) {
    super(props);
    // this.props.updateData()
    // console.log('search naja')
    // this.props.dumpData()
  }

  state = {
    // fullData: this.props.ble.data,
    // filteredData: this.props.ble.data,
    query: '',

    fullData2: this.props.ble.data_ble,
    filteredData2: this.props.ble.data_ble,
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.query === '') {
      this.setState({ filteredData2: nextProps.ble.data_ble })
    }
  }


  contains2 = ({ name, last, email }, query) => {
    if (name.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }

    return false;
  };

  handleSearch2 = (text) => {
    const formatQuery = text.toLowerCase();
    // console.log(formatQuery)
    const data = _.filter(this.props.ble.data_ble, user => {
      return this.contains2(user, formatQuery);
    })
    this.setState({ query: formatQuery, filteredData2: data });
  }


  selectPatient2 = (key) => {

    this.props.selectTracking(key);
    // this.collectSelectedtData(key);
    setTimeout(() => { Actions.jump('tf') }, 1000)
    // Actions.jump('tf')
    // console.log('this is selected key:', this.props.ble.selected2)

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    const { query } = this.state
    return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch2} value={query} />
  };


  render() {
    const { ble } = this.props;
    // console.log('this is loaded data2: ', ble.data2)
    // console.log('this is state data2: ', this.state.fullData2)

    return (
      <ScrollView>

        <FlatList
          data={this.state.filteredData2}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={`${item.name} ${item.last}`}
              subtitle={item.email}
              //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => { this.selectPatient2(item.id) }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader()}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  ble: state.ble
})

const mapDispatchToProps = (dispatch) => ({
  selectTracking: item => dispatch(selectPatientToTrackBle(item)),
  collectData: item => dispatch(collectSelectedPatientDataBle(item))
  // updateData: () => dispatch(updateAllPatient())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)