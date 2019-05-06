import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatientGps, cancelSelectedTrackingGps } from '../../actions/gps.action'

import { db } from '../../services/firebase_demo'

import _ from "lodash";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



export class TestFeature2 extends Component {

  constructor(props) {
    super(props);
    // this.map2 = createRef()
    this.state = {
      trackedPatient: 'no',

      focusedLocation: {
        latitude: 13.669557,
        longitude: 100.634628,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
      },

      locationChosen: false,

      markers: [{
        title: 'Big C',
        coordinates: {
          latitude: 13.668866,
          longitude: 100.635654
        },
      },
      {
        title: 'BITEC',
        coordinates: {
          latitude: 13.669696,
          longitude: 100.610179
        },
      }],

      markerSet: null
    }

    console.log('tf gps')
    this.props.updateData()
  }

  componentWillReceiveProps = (nextprops) => {

    if (nextprops.gps.selected_gps != null) {
      const item = _.filter(nextprops.gps.data_gps, user => {
        return this.checkEqualPL(user, nextprops.gps.selected_gps);
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
    db.ref('/patients').orderByChild('/status').equalTo('out').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      console.log(items)
    })
  }

  goToSearchPage = () => {
    Actions.jump('search_gps')
  }

  showTrackedPatient2 = () => {
    if (this.props.gps.selected_gps === null) {
      return <Text>
        Show all ble patient
      </Text>
    }

    else {
      if (this.state.trackedPatient != null) {
        if (this.state.trackedPatient != 'no') {
          // console.log('trackPatient', this.state.trackedPatient)
          let name = this.state.trackedPatient.name + ' ' + this.state.trackedPatient.last
          return <Text>
            {name}
          </Text>
        }
      }
      else {
        if (this.state.trackedPatient != 'no') {
          Alert.alert('title', 'Patient is inside the hospital now')
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
      return <Icon.Button name="times" size={22} onPress={() => { this.cancelTracking() }} />
    }
  }

  cancelTracking = () => {
    this.props.cancel()
  }

  showRoom = () => {
    if (this.props.gps.selected_gps === null) {
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

  renderMarker = () => {

    if (this.props.gps.selected_gps === null) {

      if (this.props.gps.data_gps !== null) {

        const markers = this.props.gps.data_gps.map(m => (
          <MapView.Marker
            coordinate={m.GPS}
            title={m.name}
          />
        ))
        return markers
      }

    }

    else {
      const trackedPatient = this.state.trackedPatient

      const newLatitude = trackedPatient && trackedPatient.GPS ? trackedPatient.GPS.latitude : null
      const newLongitude = trackedPatient && trackedPatient.GPS ? trackedPatient.GPS.longitude : null

      console.log('newLatitude', newLatitude)
      console.log('newLongitude', newLongitude)

      console.log(typeof (this.map2))

      // this.map2.animateToRegion({
      //   latitude: newLatitude,
      //   longitude: newLongitude,
      //   latitudeDelta: 0.0122,
      //   longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
      // });


      return <MapView.Marker
        coordinate={trackedPatient.GPS}
        title={trackedPatient.name}
      />
    }
  }


  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }

    return (
      <View>

        <View style={local.card}>
          <TouchableOpacity onPress={() => { this.goToSearchPage() }}>
            <Text>
              Search
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

        <View>
          <MapView
            initialRegion={this.state.focusedLocation}

            style={{ width: '100%', height: '100%' }}
            onPress={this.pickLocationHandler}
            ref={ref => this.map2 = ref}
          >

            {/* {marker} */}

            {/* {this.state.markers.map(m => (
              <MapView.Marker
                coordinate={m.coordinates}
                title={m.title}
              />
            ))} */}

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