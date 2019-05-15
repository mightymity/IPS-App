import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import { Actions } from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"

import { patientActions } from '../../actions'
import {colors} from "../../theme/colors";


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi, Akira } from 'react-native-textinput-effects';
import { updateAllPatientBle, updateMap } from '../../actions/ble.action'
import { updateAllPatientGps } from '../../actions/gps.action'

import { db, auth } from '../../services/firebase_demo'




// let addItem = item => {  
//     db.ref('/patients').push({
//       name: item.name,
//       ble: item.ble,
//       gps: item.gps
//     });
//   };

export class logIn extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(patientActions.updatePatientList())
  }

  confirm = () => {
    Actions.jump('tf')
  }

  state = {
    username: 'user@example.com',
    password: 'password',
    loading: false,
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
        { text: 'YES', onPress: () => this.confirm() }

      ]

    )
  }

  onChangeUsername = (value) => {
    this.setState({ username: value })
  }

  onChangePassword = (value) => {
    this.setState({ password: value })
  }

  onLoginButtonPress = () => {
    const { username, password } = this.state;
    this.setState({loading:true});
    auth.signInWithEmailAndPassword(username, password)
      .then(() => {
        alert("Signed In with \nUsername: "+username+"\nPassword: "+password);
        this.setState({ loading: false });
        this.props.dispatch(updateAllPatientBle())
        this.props.dispatch(updateMap())
        // this.props.dispatch(updateAllPatientGps())
        //this.props.dispatch(patientActions.logIn(username, password))
        Actions.jump('tf')
      })
      .catch((msgError) => { alert(msgError.message); });
  }

  renderButton() {
    if (this.state.loading) {
      return (<ActivityIndicator style={{marginTop: 30}} size='large' />);
    } else {
      return (<TouchableOpacity style={local.button} onPress={() => { this.onLoginButtonPress() }}>
        <Text style={local.btnText}>Login</Text>
      </TouchableOpacity>);
    }
  }

  onSearch = () => {

  }

  render() {
    const { username, password } = this.state
    //const avatar = '../../assets/images/default.png'
    return (
      <View style={{ alignSelf: 'stretch' }}>
        <View style={{height: 60, backgroundColor: colors.purpleA}}>
          
        </View>
        <View style={{ padding: 5, alignSelf: 'center', marginTop: 100}}>
          <Text style={local.heading1}> Login  </Text>


          <TextInput value={username} style={local.textInput} placeholder="Username"
            underlineColorAndroid={'transparent'} onChangeText={str => this.setState({ username: str })} />

          <TextInput value={password} style={local.textInput} placeholder="Password"
            underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={str => this.setState({ password: str })} />


          {this.renderButton()}

          {/* <TouchableOpacity style={local.button} onPress={() => { this.onLoginButtonPress() }}>
            <Text style={local.btnText}>Login</Text>
          </TouchableOpacity> */}
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

export default connect(mapStateToProps)(logIn)
