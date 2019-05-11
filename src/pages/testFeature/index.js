import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatientBle, cancelSelectedTrackingBle } from '../../actions/ble.action'

import { db } from '../../services/firebase_demo'

import { db2 } from '../../services/firebase_demo2';

import _ from "lodash";



export class TestFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trackedPatient: 'no',
    }

    console.log('tf ble')
    this.props.updateData()
  }

  componentWillReceiveProps = (nextprops) => {
    if (nextprops.ble.selected_ble != null) {
      const item = _.filter(nextprops.ble.data_ble, user => {
        return this.checkEqualPL(user, nextprops.ble.selected_ble);
      })
      this.setState({ trackedPatient: item[0] })
    }

    else {
      this.setState({ trackedPatient: null })
    }
  }

  checkFirebase = () => {

    db.ref('/patients').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      console.log(items)
    })
  }

  checkFirebase2 = () => {

    db.ref('/patients').child('patient01').on('value', snapshot => {
      let item = snapshot.val()
      console.log(item)
    })
  }

  checkFilterFirebase = () => {
    db.ref('/patients').orderByChild('/status').equalTo('in').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      console.log(items)
    })
  }

  goToSearchPage = () => {
    Actions.jump('realSearch')
    // db2.ref('/patients').on('value', snapshot => {
    //   let data = snapshot.val()
    //   let items = Object.values(data);
    //   console.log(items)
    // })

  }

  showTrackedPatient2 = () => {
    if (this.props.ble.selected_ble === null) {
      return <Text>
        Show all ble patient
      </Text>
    }

    else {
      if (this.state.trackedPatient != null) {
        if (this.state.trackedPatient != 'no') {
          console.log('trackPatient', this.state.trackedPatient)
          let name = this.state.trackedPatient.name + ' ' + this.state.trackedPatient.last
          return <Text>
            {name}
          </Text>
        }
      }
      else {
        if (this.state.trackedPatient != 'no') {
          Alert.alert('title', 'Patient is out of area')
          this.setState({ trackedPatient: 'no' })
          this.props.cancel()
        }
      }
    }

  }

  showCancelButton = () => {
    if (this.props.ble.selected_ble === null) {
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
    if (this.props.ble.selected_ble === null) {
      return (<Text>
        -
      </Text>)
    }

    else {
      if (this.state.trackedPatient != null) {
        if (this.state.trackedPatient != 'no')
          return <Text>
            {this.state.trackedPatient.BLE.room}
          </Text>
      }

      else {
        return (<Text>
          -
        </Text>)
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
    return (
      <View>

        <View style={local.card}>
          <TouchableOpacity onPress={() => { this.goToSearchPage() }}>
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
  cancel: () => dispatch(cancelSelectedTrackingBle()),
  updateData: () => dispatch(updateAllPatientBle())
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
