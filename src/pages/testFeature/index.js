import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Picker } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatientBle, cancelSelectedTrackingBle, updateMap } from '../../actions/ble.action'

import { db } from '../../services/firebase_demo'

import _ from "lodash";

import buildings from '../../services/demo_buildings'
import NewIndoorMap from '../../containers/new-indoor-map'

import AppText from '../../components/app-text'




export class TestFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trackedPatient: 'no',
      filteredLocationData: null,

      // buildings: buildings,
      // name: buildings[0].name,
      // nameIndex: 0,
      // floorsIndex: 0,
      // floorsNo: buildings[0].floors[0].number,

      indoorMaps: null,
      buildingName: null,
      floorNumber: null
    }

    // console.log('tf ble')
    this.props.updateMap()
    this.props.updateData()

  }

  componentWillReceiveProps = (nextprops) => {
    if (this.props.ble.ble_map !== null) {
      this.setState({ indoorMaps: this.props.ble.ble_map })
      if (this.props.ble.building_name !== null && this.props.ble.floor_number !== null) {
        const buildingName = this.props.ble.building_name
        const floorNumber = this.props.ble.floor_number
        // console.log('initialBuildingName-TF',initialBuildingName)
        // console.log('initialFloorNumber-TF',initialFloorNumber)
        this.setState({ buildingName: buildingName, floorNumber: floorNumber })
      }
    }

    if (nextprops.ble.selected_ble != null) {
      const item = _.filter(nextprops.ble.data_ble, user => {
        return this.checkEqualPL(user, nextprops.ble.selected_ble);
      })
      this.setState({ trackedPatient: item[0] })
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
    db.ref('/patients').orderByChild('/status').equalTo('in').on('value', snapshot => {
      let data = snapshot.val()
      let items = Object.values(data);
      console.log(items)
    })
  }

  goToSearchPage = () => {
    Actions.jump('realSearch')
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

  checkBuilding = () => {
    console.log(buildings[0].floors)
  }

  renderPatient = () => {
    if (this.state.buildingName !== null && this.state.floorNumber !== null) {
      const data = _.filter(this.props.ble.data_ble, user => {
        return this.checkPatientLocation(user, this.state.buildingName, this.state.floorNumber);
      })
      // this.setState({ filteredLocationData: data });
      console.log('filteredLocationData', data)
    }
  }

  checkPatientLocation = ({ BLE }, name, floor) => {
    const buildingName = BLE.building
    const buildingFloor = BLE.floor.toString()
    if (buildingName === name && buildingFloor === floor) {
      return true;
    }

    return false;
  };

  debugEverything = () => {
    // this.setState({name:buildings[0].name, floorsNo:buildings[0].floors[1].number})
    db.ref('/buildings').on("value", function (snapshot) {
      let data = snapshot.val()
      let items = Object.values(data)
      console.log(items)
    })
  }


  render() {
    const { name, floorsNo, } = this.state;
    const black = '#000000';

    // console.log('this is a tempX', this.state.tempX)
    // console.log('this is ble_map',this.props.ble.ble_map)
    // console.log('trackedPatient', this.state.trackedPatient)

    // console.log('reducer', this.props.ble)
    // console.log('maps', this.state.indoorMaps)
    // console.log('buildName',this.state.buildingName)
    // console.log('floorNumber',this.state.floorNumber)


    return (
      // old
      <View style={{}}>
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

        {this.renderPatient()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  ble: state.ble
})

const mapDispatchToProps = (dispatch) => ({
  cancel: () => dispatch(cancelSelectedTrackingBle()),
  updateData: () => dispatch(updateAllPatientBle()),
  updateMap: () => dispatch(updateMap())
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
