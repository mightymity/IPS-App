import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import { selectPatientToTrack, updateAllPatient } from '../../actions/ble.action'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";


class Search extends Component {

  constructor(props) {
    super(props);
    // this.props.updateData()
  }

  state = {
    fullData: this.props.ble.data,
    filteredData: this.props.ble.data,
    query: '',

    fullData2: this.props.ble.data2,
    filteredData2: this.props.ble.data2,
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.query === '') {
      this.setState({ filteredData2: nextProps.ble.data2 })
    }
  }

  // contains = ({ name, email }, query) => {
  //   const { first, last } = name;
  //   if (first.includes(query) || last.includes(query) || email.includes(query)) {
  //     return true;
  //   }

  //   return false;
  // };

  contains2 = ({ name, last, email }, query) => {
    if (name.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }

    return false;
  };

  // handleSearch = (text) => {
  //   const formatQuery = text.toLowerCase();
  //   console.log(formatQuery)
  //   const data = _.filter(this.state.fullData, user => {
  //     return this.contains(user, formatQuery);
  //   })
  //   this.setState({ query: formatQuery, filteredData: data });
  // }

  handleSearch2 = (text) => {
    const formatQuery = text.toLowerCase();
    // console.log(formatQuery)
    const data = _.filter(this.props.ble.data2, user => {
      return this.contains2(user, formatQuery);
    })
    this.setState({ query: formatQuery, filteredData2: data });
  }


  // selectPatient = (item) => {
  //   // console.log("This is item name: ", item.name.first)
  //   this.props.tracking(item);
  //   Actions.jump('tf');
  //   // console.log('this is selected index: ', this.props.ble.selected);
  // }

  selectPatient2 = (item) => {

    this.props.selectTracking(item);
    Actions.jump('tf');

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
  selectTracking: item => dispatch(selectPatientToTrack(item)),
  // updateData: () => dispatch(updateAllPatient())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)