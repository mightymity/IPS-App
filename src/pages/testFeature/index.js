import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Picker } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatientBle, cancelSelectedTrackingBle, updateMap, setCurrentBuilding, setCurrentFloor } from '../../actions/ble.action'

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

      indoorMaps: null,
      buildingName: null,
      buildingIndex: null,
      floorNumber: null,

    }

    // console.log('tf ble')
    this.props.updateMap()
    this.props.updateData()

  }

  componentWillReceiveProps = (nextprops) => {
    if (this.props.ble.ble_map !== null) {
      this.setState({ indoorMaps: this.props.ble.ble_map })
      if (this.props.ble.building_index !== null && this.props.ble.floor_number !== null) {
        if (this.state.buildingIndex === null && this.state.floorNumber === null) {
          const buildingIndex2 = this.props.ble.building_index
          const buildingName2 = this.props.ble.ble_map[buildingIndex2].name
          const floorNumber2 = this.props.ble.floor_number
          this.setState({ buildingName: buildingName2, buildingIndex: buildingIndex2, floorNumber: floorNumber2 })
        }
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
          // console.log('trackedPatient', this.state.trackedPatient)
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

  selectBuildingIndex = (index) => {
    const name = this.state.indoorMaps[index].name
    this.setState({ buildingName: name, buildingIndex: index })
    this.props.setBuilding(index)
  }

  selectFloorIndex = (index) => {
    const fs = this.state.indoorMaps[this.state.buildingIndex].floors
    const number = Object.keys(fs)[index]
    this.setState({ floorNumber: number })
    this.props.setFloor(number)
  }

  renderBuildingPicker = () => {
    if (this.state.buildingIndex !== null) {
      return this.state.indoorMaps.map((item, index) => (
        <Picker.Item label={item.name} value={item.name} style={{ fontSize: 16 }} />
      ))
    }
  }

  renderFloorPicker = () => {
    if (this.state.floorNumber !== null) {
      const f = this.state.indoorMaps[this.state.buildingIndex].floors
      const set = []

      for (x in f) {
        set.push(<Picker.Item label={f[x].number.toString()} value={f[x].number.toString()} style={{ fontSize: 16 }} />)
      }

      return set
    }
  }

  renderFloorImage = () => {
    if (this.state.indoorMaps !== null) {
      const selectedLocation = this.state.indoorMaps[this.state.buildingIndex].floors[this.state.floorNumber]
      if (typeof (selectedLocation) != 'undefined') {
        return <Image resizeMode='center' style={{ width: 800, height: 400 }} source={{ uri: selectedLocation.img }}></Image>
      }
    }
  }

  renderPatient = () => {
    if (this.state.trackedPatient !== null) {
      if (this.state.trackedPatient === 'no') {
        if (this.state.buildingName !== null && this.state.floorNumber !== null) {
          const data = _.filter(this.props.ble.data_ble, user => {
            return this.checkPatientLocation(user, this.state.buildingName, this.state.floorNumber);
          })
          // this.setState({ filteredLocationData: data });
          console.log('filteredLocationData', data)
        }
      }
      else {
        console.log('trackedPatient', this.state.trackedPatient)
        const trackedPatient = this.state.trackedPatient
        const trackedBuildingName = trackedPatient.BLE.building
        const trackedFloorNumber = trackedPatient.BLE.floor.toString()
        const trackedBuildingIndex = _.findIndex(this.state.indoorMaps, function(o){
          return o.name === trackedBuildingName
        })

        // console.log('trackedBuildingIndex',trackedBuildingIndex)
        // console.log('trackedFloorNumber',trackedFloorNumber)

        // this.setState({ buildingName: trackedBuildingName, buildingIndex: trackedBuildingIndex, floorNumber: trackedFloorNumber })
      }
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
  }


  render() {
    // const { name, floorsNo, } = this.state;
    const { buildingName, floorNumber } = this.state;
    const black = '#000000';


    return (

      // new v.2
      <View style={{ flex: 1 }}>
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
          {/* <View style={[local.card, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text>
                  Room:
                </Text>
                {this.showRoom()}
              </View> */}
          <View>
          </View>
        </View>



        <View style={[local.container, local.card, local.customCard, { flex: 1 }]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '' }}>
            <AppText size="xxl" value="Overview" center bold color={black} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', }}>
            <View style={{ flex: 3, justifyContent: 'center' }}>

              <Picker
                style={local.x}
                mode="dropdown"
                selectedValue={buildingName}
                onValueChange={(item, index) => { this.selectBuildingIndex(index) }}>

                {this.renderBuildingPicker()}

              </Picker>
              <View style={local.pickerUnderline} />
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>

              <Picker
                style={local.x}
                mode="dropdown"
                selectedValue={floorNumber}
                onValueChange={(item, index) => { this.selectFloorIndex(index) }}>

                {this.renderFloorPicker()}

              </Picker>
              <View style={local.pickerUnderline} />

            </View>
          </View>

          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

            {this.renderFloorImage()}

          </View>
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
  updateMap: () => dispatch(updateMap()),
  setBuilding: (index) => dispatch(setCurrentBuilding(index)),
  setFloor: (number) => dispatch(setCurrentFloor(number))
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
