import React, { Component } from 'react'
import { View, Text, FlatList, Image, TextInput, ScrollView, TouchableOpacity, Alert} from 'react-native'
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


export class Patient extends Component {


  constructor(props) {
    super(props);

    const {dispatch} = props;
    dispatch(patientActions.updatePatientList())
  }

  state = {
    curr: 'lll'
  }
  goToReg = () => {
    Actions.jump('patient_regis')
  }

  goToEdit = () => {
    const { curr } = this.state
    // console.log('curr', curr)
    this.props.dispatch(patientActions.selectEditPatient(curr))
    Actions.jump('patient_edit');
  }

  onChangeId = (value) => {
    //console.log(value)
    this.setState({curr: value})
    //console.log(this.state.curr)
    this.changeCurrent()
    // const current = this.state
    // this.props.dispatch(patientActions.setCurrent(current))
    // this.goToEdit()
    //console.log('fjfsd:',this.state.current)
    //this.onChangeCurrent()
  }

  changeCurrent = () => {
    Alert.alert(
    
      // This is Alert Dialog Title
      'Message',
   
      // This is Alert Dialog Message. 
      'Edit this patient information?',
      [
        // First Text Button in Alert Dialog.
        {text: 'YES', onPress: () => this.goToEdit()},
        {text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
        
        
      ],
      { cancelable: false }
   
    )
  }


  // onChangeCurrent = (patients, index)
  // onChangeCurrent = () => {
  //   // let ids = [...patients];     // create the copy of state array
  //   // ids[index].current = true;                  //new value
  //   // this.setState({ ids });
  //   // this.goToEdit()
  //   const { current } = this.state
  //   this.props.dispatch(patientActions.setCurrent(current))
  //   this.goToEdit()
  // }

  onDeletePatient = (index) => {
    Alert.alert(
    
      // This is Alert Dialog Title
      'Message',
   
      // This is Alert Dialog Message. 
      'Delete this patient?',
      [
        // First Text Button in Alert Dialog.
        {text: 'YES', onPress: () => this.deletePatient(index)},
        {text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
        
        
      ],
      { cancelable: false }
   
    )
   // this.deletePatient(index)
  }

  deletePatient = (index) => {
    this.props.dispatch(patientActions.deletePatientByIndex(index));
  }
  
  

  // renderItem = ({ item }) => (
  //   <ListItem
  //     title={item.name}
  //     subtitle={item.subtitle}
  //     leftAvatar={{ source: { uri: item.avatar_url } }}
  //   />
  // )




  render() {
    const { patients } = this.props;
    // const goToEdit = (n, b, g) => {
    //   Actions.patient_edit({ name: n, ble: b, gps: g })
    // };
    return (

      //{/* // <View>
      // // <SearchPatient />

      // // </View> */}

      //{/* <SearchPatient /> */}

      <ScrollView style={local.view} contentContainerStyle={global.pageScrollView}>
        <SearchPatient />


        {/* <FlatList
        //keyExtractor={this.keyExtractor}
        data={list}
        renderItem={this.renderItem}
        /> */}
        <FlatList data={patients.data} renderItem={({ item, index }) =>
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
        } />

        <View style={{alignSelf: 'flex-end',
            alignItems: 'flex-end',
            padding: 20,
            marginTop: 30,
            flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => { this.goToReg() }}>
        <Image style={{height: 40, width: 40}} source={require('../../assets/icons/plus.png')} />
        </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  // render() {
  //     const { todos } = this.props;
  //     return (
  //         <View style={global.pageContainer}>
  //              <Text>Patient</Text>
  //         </View>
  //     )
  // }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  patients: state.patients
})

export default connect(mapStateToProps)(Patient)
