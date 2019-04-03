import React, { Component } from 'react'
import { View, Text, FlatList, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListItem} from 'react-native-elements'

import { local } from './style'
import { global,colors } from '../../theme'

import {Actions} from 'react-native-router-flux'

import SearchPatient from "../../containers/search-patient"
import TodoItem from '../../components/todo-item'
import PatientList from '../../components/patient-list'



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

    


import Autocomplete from 'react-native-autocomplete-input'

export class Patient extends Component {
  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Building 1 - 1st Floor'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Building 1 - 1st Floor'
    },
    {
        name: 'Linda Clark',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg',
        subtitle: 'Building 1 - 1st Floor'
      }
      
]

state = {
  patients: [{ name: "Prayut JunOK", duty: "Uncle near home" },
  { name: "Pravitt TheWatch", duty: "Watcher" },
  { name: "Suthep T.", duty: "Karawa Land" }],

  buildings: [{
      name: 'IC Building',
      floors: [
          {
              number: '6',
              img: 'abc'
          },
          {
              number: '8',
              img: 'abc'
          }
      ]
  },
  {
      name: 'ECC Building',
      floors: [
          {
              number: '3',
              img: 'abc'
          },
          {
              number: '5',
              img: 'abc'
          }
      ]
  }
  ]

}
    goToReg = () => {
      Actions.jump('patient_regis')
    }

    renderItem = ({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.subtitle}
          leftAvatar={{ source: { uri: item.avatar_url } }}
        />
      )
      

    render () {
      const { patients } = this.props;
    return (
        
         //{/* // <View>
        // // <SearchPatient />
        
        // // </View> */}
        
            //{/* <SearchPatient /> */}
        
        <ScrollView style={{flex:3}} contentContainerStyle={global.pageScrollView}>
        <SearchPatient patients={this.state.patients}/>
        
        
        {/* <FlatList
        //keyExtractor={this.keyExtractor}
        data={list}
        renderItem={this.renderItem}
        /> */}
        <FlatList data={patients} renderItem={({ item, index }) =>
            <PatientList name={item.name} ble={item.ble} gps={item.gps} />
        } />
        
        
        <TouchableOpacity style={local.button} onPress={() => {this.goToReg()}}>
          <Text style={local.btnText}>Add</Text>
        </TouchableOpacity>

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

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
