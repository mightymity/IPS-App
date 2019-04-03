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



// list = [
//     {
//       name: 'Amy Farha',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//       subtitle: 'Vice President'
//     },
//     {
//       name: 'Chris Jackson',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//       subtitle: 'Vice Chairman'
//     },
// ]
//===========================
// {
//   name: 'James Taylor',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Helen Young',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Steve Brown',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Amanda Clark',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Sam Wright',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/56.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Claire Smith',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/42.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Henry White',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/79.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },
// {
//   name: 'Jasmine Simmons',
//   avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/85.jpg',
//   subtitle: 'Building 1 - 1st Floor'
// },




export class Patient extends Component {
  // list = [
  //   {
  //     name: 'Amy Farha',
  //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  //     subtitle: 'Building 1 - 1st Floor'
  //   },
  //   {
  //     name: 'Chris Jackson',
  //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  //     subtitle: 'Building 1 - 1st Floor'
  //   },
  //   {
  //     name: 'Linda Clark',
  //     avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg',
  //     subtitle: 'Building 1 - 1st Floor'
  //   }

  // ]

  state = {
    current: false,
  }
  goToReg = () => {
    Actions.jump('patient_regis')
  }

  goToEdit = () => {
    Actions.jump('patient_edit');
  }

  onChangeCurrent = (patients, index) => {
    let ids = [...patients];     // create the copy of state array
    ids[index].current = true;                  //new value
    this.setState({ ids });
    this.goToEdit()
  }

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
        <FlatList data={patients} renderItem={({ item, index }) =>
          <View style={{flexDirection:'row'}}>
            <PatientList name={item.name} ble={item.ble} gps={item.gps} />
            <TouchableOpacity onPress={() => this.onDeletePatient(index)}>
            <Image style={local.image} source={require('../../assets/icons/remove.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onChangeCurrent(patients, index)}>
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
