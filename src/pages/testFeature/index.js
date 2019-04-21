import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { listAllBlePatients, updateAllPatient, updateTrackingPatient } from '../../actions/ble.action'

import { db } from '../../services/firebase_demo'



export class TestFeature extends Component {

  constructor(props) {
    super(props);
    if (this.props.ble.selected2 === null) {
      return null
    }
    else {
      this.props.updateTrackData(this.props.ble.selected2)
    }
  }

  state = {
    trackedPatient: this.props.ble.selected2,
  }

  checkFirebase = () => {

    db.ref('/patients').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      // this.setGlobalData(items)
      console.log(items)
    })
  }

  checkFirebase2 = () => {

    db.ref('/patients').child('patient01').on('value', snapshot => {
      let item = snapshot.val()
      console.log(item)
    })
  }

  loadData = () => {
    // this.props.updateData()
    Actions.jump('realSearch')
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  callRealSearch = () => {
    this.setState({ show: !this.state.show })
  }

  // showTrackedPatient = () => {
  //   if (this.state.trackedPatient === null) {
  //     return <Text>
  //       Show all ble patient
  //     </Text>
  //   }

  //   else {
  //     let name = this.state.trackedPatient.name.first
  //     return <Text>
  //       {name}
  //     </Text>

  //     // console.log('This index will show in this page: ', this.props.ble.data[this.state.trackedPatientIndex].name.first)
  //   }
  // }

  showTrackedPatient2 = () => {
    if (this.props.ble.selectedData === null) {
      return <Text>
        Show all ble patient
      </Text>
    }

    else {
      let name = this.props.ble.selectedData.name + ' ' + this.props.ble.selectedData.last
      return <Text>
        {name}
      </Text>

      // console.log('This index will show in this page: ', this.props.ble.data[this.state.trackedPatientIndex].name.first)
    }
  }

  showCancelButton = () => {
    if (this.state.trackedPatient === null) {
      return null
    }

    else {
      return <Icon.Button name="times" size={22} onPress={() => { this.cancelTracking() }} />
    }
  }

  cancelTracking = () => {
    this.props.cancel()
  }

  componentWillReceiveProps = (nextprops) => {
    // console.log('remain index: ', nextprops.ble.selected)
    this.setState({ trackedPatient: nextprops.ble.selected2 })
    console.log('nextProps: ', nextprops.ble.selected2)
  }

  room = () => {
    if(this.props.ble.selectedData === null){
      return (<Text>
        -
      </Text>)
    }

    else{
      return (<Text>
        {this.props.ble.selectedData.room}
      </Text>)
    }
  }


  render() {

    return (
      <View>

        <View style={local.card}>
          <TouchableOpacity onPress={() => { Actions.jump('realSearch') }}>
            <Text>
              Try this
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              {this.showTrackedPatient2()}
            </View>
            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              {this.showCancelButton()}
            </View>
          </View>

        </View>
        <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text>
            Room:
            </Text>
          {this.room()}
        </View>

        <View>

        </View>
      </View>
    )

  }

}

const mapStateToProps = (state) => ({
  ble: state.ble
})

const mapDispatchToProps = (dispatch) => ({
  cancel: () => dispatch(listAllBlePatients()),
  updateTrackData: (key) => dispatch(updateTrackingPatient(key)),
  updateData: () => dispatch(updateAllPatient())
})


const styles = StyleSheet.create({
  page: {
    flex: 1,
    zIndex: 1

  },

  overview: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TestFeature)
