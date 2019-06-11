import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SearchPatient from "../../containers/search-patient";

export class GPS extends Component {

    state = {
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

        patientss:[{ name: "Prayut JunOK", duty: "Uncle near home" },
        { name: "Pravitt TheWatch", duty: "Watcher" },
        { name: "Suthep T.", duty: "Karawa Land" }]

    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },

                locationChosen: true
            }
        })
    }

    trackedLocation = () => {
        if(typeof(this.map)!='undefined'){
        this.map.animateToRegion(this.state.focusedLocation)
        }

        return (
            <MapView.Marker
                coordinate={this.state.focusedLocation}
                title={this.state.title}
            />
        )
        
    }

    render() {
        const { todos } = this.props;

        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }

    

        return (
            // <ScrollView contentContainerStyle={global.pageScrollView}>
            //     <View>
            //         <SearchPatient/>
            //     </View>
            //     <View>
            //      <MapView
            //         initialRegion={this.state.focusedLocation}

            //         style={{width:'100%', height:'100%'}}
            //         onPress={this.pickLocationHandler}
            //         ref = {ref => this.map = ref}
            //      >

            //       {marker}


            //      </MapView>
            //     </View>
            //     </ScrollView>

            <ScrollView contentContainerStyle={global.pageScrollView}>
                <View>
                    {/* <SearchPatient patientss={this.state.patientss}/> */}
                    <SearchPatient patientss={this.state.patientss}/>
                </View>
                <View>
                    <MapView
                        initialRegion={this.state.focusedLocation}

                        style={{ width: '100%', height: '100%' }}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >

                        {marker}

                        {this.state.markers.map(m => (
                            <MapView.Marker
                                coordinate={m.coordinates}
                                title={m.title}
                            />
                        ))}




                    </MapView>
                </View>
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GPS)
