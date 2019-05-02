import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
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

import { db } from '../../firebase'

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
    Actions.jump('patient')
  }

  state = {
    id: this.props.patients.selectedId,
    name: this.props.patients.selectedName,
    ble: '',
    gps: ''
  }



  saveNewPatient = () => {
    //this.setState({avatar: '../../assets/images/default.png'})
    const { id, name, ble, gps } = this.state
    //addItem(this.state)
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

  render() {
    const { id, name, ble, gps } = this.state
    console.log('name registered: ', this.props.patients.selectedName)
    console.log('id registered: ', this.props.patients.selectedId)
    //const avatar = '../../assets/images/default.png'  
    return (
      <View style={{ alignSelf: 'stretch' }}>
        <ScrollView>
          <SearchPatient />
        </ScrollView>
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
            //editable={false}
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
            //editable={false}
          />

          <Hoshi
            style={local.textInput}
            label={'BLE'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeBle(value)}
            //editable={false}
          />

          <Hoshi
            style={local.textInput}
            label={'GPS'}
            // this is used as active border color
            borderColor={'#b76c94'}
            // active border height
            borderHeight={3}
            inputPadding={16}
            onChangeText={(value) => this.onChangeGps(value)}
            //editable={false}
          />

          {/* <View style={{ width: 100, alignSelf: 'center' }}>
            <Sae
              label={'ID'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'grey'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(value) => this.onChangeId(value)}
              //editable={false}
              style={local.textInput}
            />

            <Sae
              label={'Name'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'grey'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(value) => this.onChangeName(value)}
              editable={false}
            />

            <Sae
              label={'BLE'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'grey'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(value) => this.onChangeBle(value)}
              editable={false}
            />

            <Sae
              label={'GPS'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'grey'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(value) => this.onChangeGps(value)}
              editable={false}
            
            />
          </View>  */}

          {/* <TextInput value={id} style={local.textInput} placeholder="ID"
            underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeId(value)}/>

          <TextInput value={name} style={local.textInput} placeholder="Name"
            underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeName(value)} />

          <TextInput value={ble} style={local.textInput} placeholder="BLE"
            underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeBle(value)} />

          <TextInput value={gps} style={local.textInput} placeholder="GPS"
            underlineColorAndroid={'transparent'} onChangeText={(value) => this.onChangeGps(value)} />*/}

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
