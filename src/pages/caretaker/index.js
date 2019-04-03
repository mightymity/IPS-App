import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert, Image} from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import {Actions} from 'react-native-router-flux'
import SearchPatient from "../../containers/search-patient"
import { ListItem } from 'react-native-elements'
import CaretakerList from '../../components/caretaker-list'

import { caretakerActions } from '../../actions/caretaker.action';
import { Row } from 'react-native-easy-grid';

list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      //subtitle: 'Building 1 - 1st Floor'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      //subtitle: 'Building 1 - 1st Floor'
    },
    {
        name: 'Linda Clark',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'James Taylor',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Helen Young',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Steve Brown',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Amanda Clark',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Sam Wright',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/56.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Claire Smith',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/42.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Henry White',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/men\/79.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
      {
        name: 'Jasmine Simmons',
        avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/85.jpg',
        //subtitle: 'Building 1 - 1st Floor'
      },
]

export class Caretaker extends Component {

state = {
  current: false,
}

goToEdit = () => {
  Actions.jump('caretaker_edit');
}

onChangeCurrent = (caretakers, index) => {
  let ids = [...caretakers];     // create the copy of state array
  ids[index].current = true;                  //new value
  this.setState({ ids });
  this.goToEdit()
}

onDeleteCaretaker = (index) => {
  Alert.alert(
  
    // This is Alert Dialog Title
    'Message',
 
    // This is Alert Dialog Message. 
    'Delete this caregiver?',
    [
      // First Text Button in Alert Dialog.
      {text: 'YES', onPress: () => this.deleteCaretaker(index)},
      {text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
      
      
    ],
    { cancelable: false }
 
  )
 
}

deleteCaretaker = (index) => {
  this.props.dispatch(caretakerActions.deleteCaretakerByIndex(index));
}

goToReg = () => {
    Actions.jump('caretaker_regis')
  }

    

render () {
  const { caretakers } = this.props;
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
    
    <FlatList data={caretakers} renderItem={({ item, index }) =>
    <View style={{flexDirection:'row'}}>
      <CaretakerList name={item.name} id={item.id} address={item.address} tel={item.tel} patient={item.patient}/>
      <TouchableOpacity onPress={() => this.onDeleteCaretaker(index)}>
        <Image style={local.image} source={require('../../assets/icons/remove.png')} />
        {/* <Text style={local.btnText}>Delete</Text> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.onChangeCurrent(caretakers, index)}>
      <Image style={local.image} source={require('../../assets/icons/edit.png')} />
      </TouchableOpacity>
    </View>
    } />
    <View style={{alignSelf: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    marginTop: 30,
    flexDirection: 'row'}}>
    <TouchableOpacity onPress={() => {this.goToReg()}}>
    <Image style={{height: 40, width: 40}} source={require('../../assets/icons/plus.png')} />
    </TouchableOpacity>
    </View>
    </ScrollView>
  )
    }
}          
      
const mapStateToProps = (state) => ({
    todos: state.todos,
    caretakers: state.caretakers
})



export default connect(mapStateToProps)(Caretaker)
