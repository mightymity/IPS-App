import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

//import { selectPatientToTrackBle } from '../../actions/ble.action'

import Icon from 'react-native-vector-icons/FontAwesome5'

import _ from "lodash";

import { db } from '../../services/firebase_demo';

import { patientActions } from '../../actions'


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

    fullData2: [],
    filteredData2: [],
    selectedId: '',
    selectedName: '',
  }

  componentWillMount() {
    const temp = this
    db.ref('/hospital').on("value", function (snapshot) {
      let data = snapshot.val();
      let items = Object.values(data);
      console.log('item = ',items)
      temp.setState({fullData2: items})
      temp.setState({filteredData2: items})
    })
    
  }

  componentWillReceiveProps = (nextProps) => {
    const temp = this
    if (this.state.query === '') {
      db.ref('/hospital').on("value", function (snapshot) {
        let data = snapshot.val();
        let items = Object.values(data);
        temp.setState({filteredData2: items})
      })
    }
  }


  contains2 = ({ name, id }, query) => {
    const n = name.toLowerCase()
    const i = String(id)
    if (n.includes(query) || i.includes(query)) {
      return true;
    }

    return false;
  };

  handleSearch2 = (text) => {
    const formatQuery = text.toLowerCase();
    // console.log(formatQuery)
    db.ref('/hospital').on("value", function (snapshot) {
      let data = snapshot.val();
      return items = Object.values(data);
      
    })

    const data = _.filter(items, user => {
      return this.contains2(user, formatQuery);
    })

    console.log('formatQuery: ', formatQuery)
    this.setState({ query: formatQuery, filteredData2: data });
  }


  selectPatient2 = (key) => {
  //   this.props.selectTracking(key);
  //   setTimeout(() => { Actions.jump('tf') }, 1000)
    this.setState({ selectedId: key.id })
    this.setState({ selectedName: key.name})
    this.selectPatient()
  }


  goToPatientRegis = () => {
    const name = this.state.selectedName
    const id = this.state.selectedId
    this.props.dispatch(patientActions.selectHospitalPatient(name, id))
    console.log('name: ', name)
    console.log('id: ', id)
    Actions.jump('patient_regis');
  }


  cancelSelect = () => {
    this.setState({ selectedId: '' })
    this.setState({ selectedName: ''})
  }
  
  selectPatient = () => {
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Select this patient to add to the system?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToPatientRegis() },
        { text: 'NO', onPress: () => this.cancelSelect(), style: 'cancel' },


      ],
      { cancelable: false }

    )
  }


  goBack = () => {
    this.setState({ query: '' })
    Actions.jump('patient_regis')
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
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
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
    const { fullData2, filteredData2 } = this.state
    //const { ble } = this.props;
    // console.log('this is loaded data2: ', ble.data2)
    // console.log('this is state data2: ', this.state.fullData2)
    console.log('fulldata', this.state.fullData2)

    return (
      <ScrollView>

        <FlatList
          data={this.state.filteredData2}
          renderItem={({ item }) => (
            <ListItem
              //roundAvatar
              title={`${item.id} ${item.name}`}
              //subtitle={item.email}
              //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => { this.selectPatient2(item) }}
            />
          )}
          //keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader()}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  patients: state.patients,
  caretakers: state.caretakers
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(Search)