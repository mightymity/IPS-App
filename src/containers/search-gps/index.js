import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";
import { selectPatientToTrackGps } from '../../actions/gps.action';


class Search_GPS extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    // fullData: this.props.ble.data,
    // filteredData: this.props.ble.data,
    query: '',

    fullData2: this.props.gps.data_gps,
    filteredData2: this.props.gps.data_gps,
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.query === '') {
      this.setState({ filteredData2: nextProps.gps.data_gps })
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
    const data = _.filter(this.props.gps.data_gps, user => {
      return this.contains2(user, formatQuery);
    })
    this.setState({ query: formatQuery, filteredData2: data });
  }


  selectPatient2 = (item) => {

    this.props.selectTracking(item);
    Actions.jump('tf2');

  }

  goBack = () => {
    this.setState({query:''})
    Actions.jump('tf2')
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
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal:10 }}>
        <View>
          <TouchableOpacity onPress={() => { this.goBack() }}>
            <Icon name="arrow-left" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch2} value={query} />
        </View>
      </View>
    )
  };


  render() {
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
  gps: state.gps
})

const mapDispatchToProps = (dispatch) => ({
  selectTracking: item => dispatch(selectPatientToTrackGps(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search_GPS)