import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import { Actions } from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"

import { patientActions } from '../../actions'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi, Akira } from 'react-native-textinput-effects';

import { db } from '../../services/firebase_demo'

import { colors } from "../../theme/colors";





// let addItem = item => {  
//     db.ref('/patients').push({
//       name: item.name,
//       ble: item.ble,
//       gps: item.gps
//     });
//   };

export class patientRegist extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(patientActions.updatePatientList())

  }

  goToPatient = () => {
    Actions.jump('search_patient')
  }

  state = {
    id: this.props.patients.selectedId,
    name: this.props.patients.selectedName,
    bleList: this.props.patients.ble,
    gpsList: this.props.patients.gps,
    ble: this.props.patients.ble[0].id,
    gps: this.props.patients.gps[0].id,
  }



  saveNewPatient = () => {
    //this.setState({avatar: '../../assets/images/default.png'})
    const { id, name, bleList, gpsList, ble, gps } = this.state
    if ((id == null) || (name == null)){
      Alert.alert(

        // This is Alert Dialog Title
        'Message',
  
        // This is Alert Dialog Message. 
        'Please select patient',
        [
          // First Text Button in Alert Dialog.
          { text: 'OK'}
  
        ]
  
      )
    }
    //addItem(this.state)
    //console.log('this is ble regist', ble)
    else {
    this.props.dispatch(patientActions.createNewPatient(id, name, ble, gps));
    //Actions.jump('patient')
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Patient Added',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToPatient() }

      ]

    )
  }
}

  onChangeId = (value) => {
    this.setState({ id: value })
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  onChangeBle = (value) => {
    this.setState({ ble: value });
  }

  onChangeGps = (value) => {
    this.setState({ gps: value });
  }

  onSearch = () => {
    Actions.jump('search_hospital')
  }

  blePicker = () => {
    console.log('this is bleList: ', this.state.bleList)
    if (this.state.bleList !== 'N/A') {
      return this.state.bleList.map((item, index) => (
        <Picker.Item label={item.id} value={item.id} style={{ fontSize: 16 }} />
      ))
    }

    else {
      Alert.alert(

        // This is Alert Dialog Title
        'Message',
  
        // This is Alert Dialog Message. 
        'There is no BLE device available',
        [
          // First Text Button in Alert Dialog.
          { text: 'OK' }
  
        ]
  
      )
    }
  }



  gpsPicker = () => {
    console.log('this is gpsList: ', this.state.gpsList)
    if (this.state.gpsList !== 'N/A') {
      return this.state.gpsList.map((item, index) => (
        <Picker.Item label={item.id} value={item.id} style={{ fontSize: 16 }} />
      ))
    }

    else {
      Alert.alert(

        // This is Alert Dialog Title
        'Message',
  
        // This is Alert Dialog Message. 
        'There is no GPS device available',
        [
          // First Text Button in Alert Dialog.
          { text: 'OK' }
  
        ]
  
      )
    }
  }



  render() {
    const { id, name, ble, gps } = this.state
    console.log('name registered: ', this.props.patients.selectedName)
    console.log('id registered: ', this.props.patients.selectedId)
    console.log('ble r: ', this.state.ble)
  
    //const avatar = '../../assets/images/default.png'  
    return (
      <View style={{ alignSelf: 'stretch' }}>
        {/* <ScrollView>
          <SearchPatient />
        </ScrollView> */}
        <View style={{ padding: 5, alignSelf: 'center' }}>
          <Text style={local.heading1}> Registration </Text>

          <TouchableOpacity style={local.search} onPress={() => { this.onSearch() }}>
            <Text style={local.searchText}>Search</Text>
          </TouchableOpacity>

          <Hoshi
            style={local.textInput}
            label={'ID'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeId(value)}
            editable={false}
            value={id ? String(id) : null}
          />

          <Hoshi
            style={local.textInput}
            
            label={'Name'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeName(value)}
            value={ name }
            editable={false}
          />

          <Picker
            style={local.textInput}
            mode="dropdown"
            selectedValue={ble}
            onValueChange={(item, index) => { this.onChangeBle(item) }}>

            {this.blePicker()}

          </Picker>

          <Picker
            style={local.textInput}
            mode="dropdown"
            selectedValue={gps}
            onValueChange={(item, index) => { this.onChangeGps(item) }}>

            {this.gpsPicker()}

          </Picker>

          {/* <Hoshi
            style={local.textInput}
            label={'BLE'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeBle(value)}
            //editable={false}
          /> */}

          {/* <Hoshi
            style={local.textInput}
            label={'GPS'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeGps(value)}
            //editable={false}
          /> */}

          

          

          <TouchableOpacity style={local.button} onPress={() => { this.saveNewPatient() }}>
            <Text style={local.btnText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={local.button} onPress={() => { this.goToPatient() }}>
            <Text style={local.btnText}>Back</Text>
          </TouchableOpacity> 
        </View>


      </View>
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

export default connect(mapStateToProps)(patientRegist)
