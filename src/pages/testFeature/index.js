import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatient, cancelSelectedTracking, updateTrackedPatientData } from '../../actions/ble.action'

import { db } from '../../services/firebase_demo'

import _ from "lodash";



export class TestFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trackedPatient: null,
    }

    this.props.updateData()
  }

  componentWillReceiveProps = (nextprops) => {
    if (nextprops.ble.selected2 != null) {
      const item = _.filter(nextprops.ble.data2, user => {
        return this.checkEqualPL(user, nextprops.ble.selected2);
      })
      this.setState({ trackedPatient: item[0] })
    }

    else{
      this.setState({trackedPatient: null})
    }
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

  showTrackedPatient2 = () => {
    if (this.props.ble.selected2 === null) {
      return <Text>
        Show all ble patient
      </Text>
    }

    else {
      if (this.state.trackedPatient != null) {
        let name = this.state.trackedPatient.name + ' ' + this.state.trackedPatient.last
        return <Text>
          {name}
        </Text>
      }
    }
  }

  showCancelButton = () => {
    if (this.props.ble.selected2 === null) {
      return null
    }

    else {
      return <Icon.Button name="times" size={22} onPress={() => { this.cancelTracking() }} />
    }
  }

  cancelTracking = () => {
    this.props.cancel()
  }

  showRoom = () => {
    if (this.props.ble.selected2 === null) {
      return (<Text>
        -
      </Text>)
    }

    else {
      if (this.state.trackedPatient != null) {
        return <Text>
          {this.state.trackedPatient.room}
        </Text>
      }
    }
  }


  checkEqualPL = ({ id }, query) => {
    if (id === query) {
      return true;
    }
    return false;
  };


  render() {
    console.log('this is trackedpatient pos2', this.state.trackedPatient)
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
          {this.showRoom()}
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
  cancel: () => dispatch(cancelSelectedTracking()),
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
