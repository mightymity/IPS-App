import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome5'

import { updateAllPatientGps, cancelSelectedTrackingGps } from '../../actions/gps.action'

import { db } from '../../services/firebase_demo'

import _ from "lodash";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import AppText from '../../components/app-text'

export class TestFeature2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trackedPatient: 'no',

      focusedLocation: {
        latitude: this.initialLocation.latitude,
        longitude: this.initialLocation.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
      }
    }

    this.props.updateData()

  }

  initialLocation = {
    latitude: 13.669557,
    longitude: 100.634628,
  }

  componentWillReceiveProps = (nextprops) => {

    if (nextprops.gps.selected_gps != null) {
      const item = _.filter(nextprops.gps.data_gps, user => {
        return this.checkEqualPL(user, nextprops.gps.selected_gps);
      })
      this.setState({ trackedPatient: item[0] })
      this.changeLocation(item[0])
    }

    else {
      this.setState({ trackedPatient: 'no' })
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
    db.ref('/patients').orderByChild('/status').equalTo('out').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      console.log(items)
    })
  }

  goToSearchPage = () => {
    Actions.jump('search_gps')
  }

  showTrackedPatientInfo = () => {
    if (this.props.gps.selected_gps === null) {
      return null
    }

    else {
      const black = '#000000';
      if (this.state.trackedPatient != null) {
        if (this.state.trackedPatient != 'no') {
          let name = this.state.trackedPatient.id + '       ' + this.state.trackedPatient.name + ' ' + this.state.trackedPatient.last
          return (
            <AppText size="l" value={name} center bold color={black} />
          )
        }
      }
      else {
        if (this.state.trackedPatient != 'no') {
          Alert.alert('Notification', 'Patient is now inside the hospital')
          this.setState({ trackedPatient: 'no' })
          this.props.cancel()
        }
      }
    }
  }

  showCancelButton = () => {
    if (this.props.gps.selected_gps === null) {
      return null
    }

    else {
      return (
        <TouchableOpacity onPress={() => { this.cancelTracking() }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 15 }}>
              <Icon name="times" size={23} color="#FF0000" />
            </View>
            <View>
              <AppText size="l" value="Cancel" center bold color="#808080" />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  cancelTracking = () => {
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: this.initialLocation.latitude,
          longitude: this.initialLocation.longitude
        }
      }
    })

    if(typeof (this.map) !== 'undefined'){
    this.map.animateToRegion({
      latitude: this.initialLocation.latitude,
      longitude: this.initialLocation.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    }, 1000);
  }

    this.props.cancel()
  }

  checkEqualPL = ({ id }, query) => {
    if (id === query) {
      return true;
    }
    return false;
  };

  changeLocation = (item) => {
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: item.GPS.latitude,
          longitude: item.GPS.longitude
        },
        title: item.id
      }
    })
  }

  renderMarker = () => {

    if (this.props.gps.selected_gps === null) {

      if (this.props.gps.data_gps !== null && this.props.gps.data_gps !== 'N/A') {

        const markers = this.props.gps.data_gps.map(m => (
          <MapView.Marker
            coordinate={m.GPS}
            title={m.name}
          />
        ))
        return markers
      }

      else if (this.props.gps.data_gps === 'N/A') {
        Alert.alert('Notification', 'No patients outside, please check out BLE mode')
      }

    }

    else {
      if (typeof (this.state.trackedPatient) !== 'undefined') {
        const trackedPatient = this.state.trackedPatient

        const newLatitude = trackedPatient && trackedPatient.GPS ? trackedPatient.GPS.latitude : null
        const newLongitude = trackedPatient && trackedPatient.GPS ? trackedPatient.GPS.longitude : null

        if (typeof (this.map) !== 'undefined') {
          this.map.animateToRegion({
            latitude: newLatitude,
            longitude: newLongitude,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
          }, 1000);
        }


        return <MapView.Marker
          coordinate={trackedPatient.GPS}
          title={trackedPatient.name}
        />
      }
    }
  }

  renderSearchZone = () => {
    const black = '#000000';
    if (this.props.gps.selected_gps === null) {
      return (
        <TouchableOpacity onPress={() => { this.goToSearchPage() }}>
          <View style={[local.card, { flexDirection: 'row', alignItems: 'center', marginTop: 3 }]}>
            <View style={{ marginRight: 15, marginLeft: 5 }}>
              <Icon name="search" size={20} />
            </View>
            <AppText size="l" value="Search for GPS patient..." center color="#808080" />
          </View>
        </TouchableOpacity>
      )
    }

    else {
      return (
        <View style={[local.card, { flexDirection: 'row', alignItems: 'center', }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '' }}>

              {this.showTrackedPatientInfo()}

            </View>

            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '' }}>

              {this.showCancelButton()}

            </View>

            <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '' }}>
              <TouchableOpacity onPress={() => { this.goToSearchPage() }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 15 }}>
                    <Icon name="search" size={23} />
                  </View>
                  <View>
                    <AppText size="l" value="Search for BLE patient..." center bold color="#808080" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }


  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View style={{padding: 7}}>

        {this.renderSearchZone()}

        <View>
          <MapView
            initialRegion={this.state.focusedLocation}
            style={{ width: '100%', height: '100%' }}
            ref={ref => this.map = ref}
          >

            {this.renderMarker()}

          </MapView>
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  gps: state.gps
})

const mapDispatchToProps = (dispatch) => ({
  cancel: () => dispatch(cancelSelectedTrackingGps()),
  updateData: () => dispatch(updateAllPatientGps())
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

export default connect(mapStateToProps, mapDispatchToProps)(TestFeature2)
