import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import { trackingSelectedBlePatient } from '../../actions/ble.action'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";



class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullData: this.props.ble.data,
      filteredData: this.props.ble.data,
      query: '',

      fullData2: this.props.ble.data2,
      filteredData2: this.props.ble.data2
    }
  }

  // state = {
  //   fullData: this.props.ble.data,
  //   filteredData: this.props.ble.data,
  //   query: '',

  //   fullData2: this.props.ble.data2,
  //   filteredData2: this.props.ble.data2
  // }

  contains = ({ name, email }, query) => {
    const { first, last } = name;
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }

    return false;
  };

  contains2 = ({ name, last, email }, query) => {
    if (name.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }

    return false;
  };

  // getUsers = (limit = 20, query = "") => {
  //   let users = this.props.ble.data;
  //   // console.log("api called", query);
  //   return new Promise((resolve, reject) => {
  //     if (query.length === 0) {
  //       resolve(_.take(users, limit));
  //     } else {
  //       const formattedQuery = query.toLowerCase();
  //       const results = _.filter(users, user => {
  //         return contains(user, formattedQuery);
  //       });
  //       resolve(_.take(results, limit));
  //     }
  //   });
  // };

  // updateSearch = (text) => {
  //   this.setState({ query: text })
  //   console.log(text);
  // }

  handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    console.log(formatQuery)
    const data = _.filter(this.state.fullData, user => {
      return this.contains(user, formatQuery);
    })
    this.setState({ query: formatQuery, filteredData: data });
  }

  handleSearch2 = (text) => {
    const formatQuery = text.toLowerCase();
    console.log(formatQuery)
    const data = _.filter(this.state.fullData2, user => {
      return this.contains2(user, formatQuery);
    })
    this.setState({ query: formatQuery, filteredData2: data });
  }


  selectPatient = (item) => {
    // console.log("This is item name: ", item.name.first)
    this.props.tracking(item);
    Actions.jump('tf');
    // console.log('this is selected index: ', this.props.ble.selected);
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
    return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch} value={query} />
  };


  render() {
    const { ble } = this.props;
    return (

      <ScrollView>

        <FlatList
          data={this.state.filteredData}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={`${item.name} ${item.last}`}
              subtitle={item.email}
              //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => { this.selectPatient(item) }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader()}
        />
        {console.log(this.state.filteredData2)}


      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  ble: state.ble
})

const mapDispatchToProps = (dispatch) => ({
  tracking: item => dispatch(trackingSelectedBlePatient(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)