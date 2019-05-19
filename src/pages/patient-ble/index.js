import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Picker, Modal, Button } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

// import Icon from 'react-native-vector-icons/FontAwesome'

import { updateAllPatientBle, cancelSelectedTrackingBle, updateMap, setCurrentBuilding, setCurrentFloor } from '../../actions/ble.action'

import { db } from '../../services/firebase_demo'

import _ from "lodash";

// import buildings from '../../services/demo_buildings'
// import NewIndoorMap from '../../containers/new-indoor-map'

import AppText from '../../components/app-text'

import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome5'



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

      ModalVisibleStatus: false,
      modalPatient: null,

    }

    this.props.updateMap()
    this.props.updateData()

  }

  componentWillReceiveProps = (nextprops) => {
    if (this.props.ble.ble_map !== null) {
      console.log('in')
      this.setState({ indoorMaps: this.props.ble.ble_map })
      if (this.props.ble.building_index !== null && this.props.ble.floor_number !== null) {
        if (this.state.buildingIndex === null && this.state.floorNumber === null) {
          const buildingIndex = this.props.ble.building_index
          const buildingName = this.props.ble.ble_map[buildingIndex].name
          const floorNumber = this.props.ble.floor_number
          this.setState({ buildingName, buildingIndex, floorNumber })
        }
      }
    }

    if (nextprops.ble.selected_ble != null) {
      const item = _.filter(nextprops.ble.data_ble, user => {
        return this.checkEqualPL(user, nextprops.ble.selected_ble);
      })

      if (typeof (item[0]) !== 'undefined') {
        const trackedPatient = item[0]
        const trackedBuildingName = trackedPatient.BLE.building
        const trackedFloorNumber = trackedPatient.BLE.floor.toString()
        const trackedBuildingIndex = _.findIndex(this.props.ble.ble_map, function (o) {
          return o.name === trackedBuildingName
        })
        this.setState({
          trackedPatient, buildingName: trackedBuildingName, buildingIndex: trackedBuildingIndex,
          floorNumber: trackedFloorNumber
        })
      }

      else {
        this.setState({ trackedPatient: item[0] })
      }
    }

    else {
      this.setState({ trackedPatient: 'no' })
    }
  }

  goToSearchPage = () => {
    Actions.jump('realSearch')
  }

  showTrackedPatientInfo = () => {
    if (this.props.ble.selected_ble === null) {
      return null
    }

    else {
      const black = '#000000';
      if (this.state.trackedPatient != null) {
        if (this.state.trackedPatient != 'no') {
          let name = this.state.trackedPatient.id + '       ' + this.state.trackedPatient.name
          return (
            <AppText size="l" value={name} center bold color={black} />
          )
        }
      }
      else {
        if (this.state.trackedPatient != 'no') {
          Alert.alert('Notification', 'Patient is out of the hospital area')
          this.setState({ trackedPatient: 'no' })

          const buildingIndex = this.props.ble.building_index
          const buildingName = this.props.ble.ble_map[buildingIndex].name
          const floorNumber = this.props.ble.floor_number
          this.setState({ buildingName, buildingIndex, floorNumber })

          this.props.cancel()
          Actions.jump('patient_gps')
          
        }
      }
    }
  }

  showCancelButton = () => {
    if (this.props.ble.selected_ble === null) {
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
    const buildingIndex = this.props.ble.building_index
    const buildingName = this.props.ble.ble_map[buildingIndex].name
    const floorNumber = this.props.ble.floor_number
    this.setState({ buildingName, buildingIndex, floorNumber })
    this.props.cancel()
    Actions.jump('search_patient')
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

  renderSearchZone = () => {
    const black = '#000000';
    if (this.props.ble.selected_ble === null) {
      return (
        <TouchableOpacity onPress={() => { this.goToSearchPage() }}>
          <View style={[local.card, { flexDirection: 'row', alignItems: 'center', marginTop: 3 }]}>
            <View style={{ marginRight: 15, marginLeft: 5 }}>
              <Icon name="search" size={20} />
            </View>
            <AppText size="l" value="Search for BLE patient..." center color="#808080" />
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

            {/* <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '' }}>
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
            </View> */}
          </View>
        </View>
      )
    }
  }

  renderMiddleZone = () => {
    const { buildingName, floorNumber, trackedPatient } = this.state;
    const black = '#000000';

    if (this.props.ble.selected_ble === null) {
      return (
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
      )
    }

    else {
      if (trackedPatient !== null && trackedPatient !== 'no' && typeof (trackedPatient) !== 'undefined') {
        return (
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AppText size="xl" value="Buidling: " center bold color={black} />
              <AppText size="xl" value={this.state.buildingName} center color={black} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AppText size="xl" value="Floor: " center bold color={black} />
              <AppText size="xl" value={this.state.floorNumber} center color={black} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AppText size="xl" value="Room: " center bold color={black} />
              <AppText size="xl" value={trackedPatient.BLE.room.toString()} center color={black} />
            </View>

          </View>
        )
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

  renderFloorImage = () => {
    if (this.state.indoorMaps !== null) {
      const selectedLocation = this.state.indoorMaps[this.state.buildingIndex].floors[this.state.floorNumber]

      if (typeof (selectedLocation) != 'undefined') {
        return (
          <View style={{ backgroundColor: '', width: 800, height: 500 }}>
            <Image resizeMode='contain' style={{ width: 800, height: 500 }} source={{ uri: selectedLocation.img }} />

            {this.renderPatientMarker(selectedLocation)}

          </View>
        )
      }
    }
  }

  renderPatientMarker = (selectedLocation) => {
    const temp = this
    if (this.props.ble.data_ble !== 'N/A') {
      const trackedPatient = this.state.trackedPatient;
      if (trackedPatient !== null && typeof (trackedPatient) !== 'undefined') {
        if (trackedPatient === 'no') {
          if (this.state.buildingName !== null && this.state.floorNumber !== null) {
            const data = _.filter(this.props.ble.data_ble, user => {
              return this.checkPatientLocation(user, this.state.buildingName, this.state.floorNumber);
            })

            // console.log('filteredLocationData', data)

            // ส่ง item
            if (data !== []) {
              return data.map((item, index) => (
                <Ionicons style={{
                  position: "absolute",
                  width: 25,
                  height: 25,
                  color: "tomato",
                  top: selectedLocation.rooms[item.BLE.room].grids[item.BLE.grid].top,
                  left: selectedLocation.rooms[item.BLE.room].grids[item.BLE.grid].left
                }} name="ios-close-circle" size={25} onPress={() => { temp.renderModal(item) }} />
              ))
            }
          }
        }

        else {
          // ส่ง this.state.trackedPatient
          const patientGrid = selectedLocation.rooms[this.state.trackedPatient.BLE.room].grids[this.state.trackedPatient.BLE.grid]
          return (<Ionicons style={{
            position: "absolute",
            width: 25,
            height: 25,
            color: "tomato",
            top: patientGrid.top,
            left: patientGrid.left
          }} name="ios-close-circle" size={25} onPress={() => { this.renderModal(this.state.trackedPatient) }} />


          )
        }
      }
    }
    else {
      Alert.alert('title', 'No patients inside the hospital area')
    }
  }

  ShowModalFunction = (visible, item) => {

    this.setState({ ModalVisibleStatus: visible });
    //this.setState({ modalPatient: item })
    this.renderModal(item)

  }

  renderModal = (item) => {
    
    // db.ref('/hospital').child(item.id).on("value", function (snapshot) {
    //   let data = snapshot.val();
    //   console.log(data)
    //   return data
    //   //let items = Object.values(data);
    //   //console.log(items)
    // })
  

    //console.log(hospital)

    const id = 'ID:   ' + item.id
    const name = 'Name:   ' + item.name
    // const hosp = 'Blood Type:   ' + data.blood
    // const diagnosis = 'Diagnosis:   ' + data.diagnosis
    const c = id + '\n\n' + name 
    Alert.alert(

      // This is Alert Dialog Title
      '',

      // This is Alert Dialog Message. 
      c,
      [
        // First Text Button in Alert Dialog.
        { text: 'OK' }



      ],
      { cancelable: false }

    )
    // console.log('in')
    // return (
    //   <Modal
    //     transparent={true}

    //     animationType={"fade"}

    //     visible={this.state.ModalVisibleStatus}

    //     onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >


    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


    //       <View style={local.ModalInsideView}>


    //         {/* Put All Your Components Here, Which You Want To Show Inside The Modal. */}

    //         <Text style={local.TextStyle}>Name: {item.name} {'\n'}  Id: {item.id} </Text>

    //         <Button title="Close" onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} />

    //         {/* Put All Your Components Here, Which You Want To Show Inside The Modal. */}


    //       </View>

    //     </View>


    //   </Modal>

    // )
  }

  render() {

    console.log('trackedPatient', this.state.trackedPatient)


    return (

      <View style={{ flex: 1 }}>

        {this.renderSearchZone()}

        <View style={[local.container, local.card, local.customCard, { flex: 1 }]}>

          {this.renderMiddleZone()}

          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

            {this.renderFloorImage()}

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
