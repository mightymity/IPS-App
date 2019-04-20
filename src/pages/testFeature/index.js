import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { listAllBlePatients, updateData } from '../../actions/ble.action'
// import { db } from '../../services/firebase_demo'

export class TestFeature extends Component {


  state = {
    trackedPatient: this.props.ble.selected,
  }

  checkFirebase = () => {
    // Actions.jump('realSearch')   
    
    // db.ref('/patients').on('value', snapshot => {
    //   let data = snapshot.val()
    //   let items = Object.values(data);
    //   this.setGlobalData(items)
    // })
  }

  setGlobalData = (items) => {
    this.props.setGlobal(items)
    Actions.jump('realSearch')
  }

  onChangeName = (value) => {
    this.setState({ name: value })
  }

  callRealSearch = () => {
    this.setState({ show: !this.state.show })
  }

  showTrackedPatient = () => {
    if (this.state.trackedPatient === null) {
      return <Text>
        Show all ble patient
      </Text>
    }

    else {
      let name = this.state.trackedPatient.name.first
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
    this.setState({ trackedPatient: nextprops.ble.selected })
  }


  render() {


    return (
      <View>
        <View style={local.card}>
          <TouchableOpacity onPress={() => { Actions.jump('realSearch')}}>
            <Text>
              Try this
      </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              {this.showTrackedPatient()}
            </View>
            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              {this.showCancelButton()}
            </View>
          </View>
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
  setGlobal: items => dispatch(updateData(items))
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
