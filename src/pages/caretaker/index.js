import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import { Actions } from 'react-native-router-flux'
import SearchPatient from "../../containers/search-patient"
import { ListItem } from 'react-native-elements'
import CaretakerList from '../../components/caretaker-list'

import { caretakerActions } from '../../actions/caretaker.action';
import { Row } from 'react-native-easy-grid';


export class Caretaker extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    dispatch(caretakerActions.updateCaretakerList())
  }

  state = {
    curr: '',
  }

  goToEdit = () => {
    const { curr } = this.state
    this.props.dispatch(caretakerActions.selectEditCaretaker(curr))
    Actions.jump('caretaker_edit');
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
      'Edit this caretaker information?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToEdit() },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


      ],
      { cancelable: false }

    )
  }

  onDeleteCaretaker = (index) => {
    Alert.alert(

      // This is Alert Dialog Title
      'Message',

      // This is Alert Dialog Message. 
      'Delete this caretaker?',
      [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.deleteCaretaker(index) },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


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



  render() {
    const { caretakers } = this.props;
    return (
      <ScrollView style={local.view} contentContainerStyle={global.pageScrollView}>
        <SearchPatient />

        <FlatList data={caretakers.data} renderItem={({ item, index }) =>
          <View style={{ flexDirection: 'row' }}>
            <CaretakerList name={item.name} id={item.id} patient={item.patient} />
            <TouchableOpacity onPress={() => this.onDeleteCaretaker(item.id)}>
              <Image style={local.image} source={require('../../assets/icons/remove.png')} />
              {/* <Text style={local.btnText}>Delete</Text> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onChangeId(item.id)}>
              <Image style={local.image} source={require('../../assets/icons/edit.png')} />
            </TouchableOpacity>
          </View>
        } />
        <View style={{
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          padding: 20,
          marginTop: 30,
          flexDirection: 'row'
        }}>
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
  caretakers: state.caretakers
})



export default connect(mapStateToProps)(Caretaker)
