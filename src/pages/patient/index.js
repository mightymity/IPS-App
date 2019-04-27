import React, { Component } from 'react'
import { View, Text, FlatList, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'

import { local } from './style'
import { global } from '../../theme'
import colors from '../../theme/colors'

import { Actions } from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"
import TodoItem from '../../components/todo-item'
import PatientList from '../../components/patient-list'

import { patientActions } from '../../actions/patient.action';

import { db, auth } from '../../firebase';


export class Patient extends Component {


  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(patientActions.updatePatientList())
  }

  state = {
    curr: ''
  }

  logout = () => {
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Are you sure you want to Logout?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => auth.signOut().then(() => {
          Alert.alert(
            'Message',
            'Logout successfully'
          )
          Actions.jump('login')
        }).catch((msgError) => { alert(msgError.message); }) },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


      ],
      { cancelable: false }

    )

    // auth.signOut().then(() => {
    //   Actions.jump('login')
    // })
  }

  goToReg = () => {
    Actions.jump('patient_regis')
  }

  goToEdit = () => {
    const { curr } = this.state
    this.props.dispatch(patientActions.selectEditPatient(curr))
    Actions.jump('patient_edit');
  }

  onChangeId = (value) => {
    this.setState({ curr: value })
    this.changeCurrent()
  }

  changeCurrent = () => {
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Edit this patient information?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToEdit() },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


      ],
      { cancelable: false }

    )
  }



  onDeletePatient = (index) => {
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Delete this patient?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.deletePatient(index) },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


      ],
      { cancelable: false }

    )

  }

  deletePatient = (index) => {
    this.props.dispatch(patientActions.deletePatientByIndex(index));
  }


  renderItem = ({ item }) => (
    <ListItem bottomDivider={true}
      title={item.name}
      subtitle={
        <View>
          <Text>BLE: {item.ble}     GPS: {item.gps}</Text>
        </View>
      }
      leftAvatar={{
        source: item.avatar_url && { uri: item.avatar_url },
        title: item.name[0]
      }}
      rightElement={
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onChangeId(item.id)}>
            <Image style={local.image} source={require('../../assets/icons/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onDeletePatient(item.id)}>
            <Image style={local.image} source={require('../../assets/icons/remove.png')} />
          </TouchableOpacity>

        </View>
      }
    />
  )


  render() {
    const { patients } = this.props;

    return (

      <ScrollView style={local.view} contentContainerStyle={global.pageScrollView}>
        <SearchPatient />
        <FlatList
          data={patients.data}
          renderItem={(this.renderItem)}
        />
        {/* <FlatList data={patients.data} renderItem={({ item, index }) =>
          <View style={{flexDirection:'row'}}>
            <PatientList id={item.id} name={item.name} ble={item.ble} gps={item.gps} />
            <Text> {item.id} </Text>
            <TouchableOpacity onPress={() => this.onDeletePatient(item.id)}>
            <Image style={local.image} source={require('../../assets/icons/remove.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onChangeId(item.id)}>
            <Image style={local.image} source={require('../../assets/icons/edit.png')} />
            </TouchableOpacity>
          </View>
        } /> */}

        <View style={{
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          padding: 20,
          marginTop: 30,
          flexDirection: 'row'
        }}>

          <TouchableOpacity style={local.button} onPress={() => { this.logout() }}>
            <Text style={local.btnText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.goToReg() }}>
            <Image style={{ height: 40, width: 40 }} source={require('../../assets/icons/plus.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  patients: state.patients
})

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps)(Patient)
