import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'

import MapView , {PROVIDER_GOOGLE} from 'react-native-maps';

export class GPS extends Component {

    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },

        locationChosen: false
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

    render() {
        const { todos } = this.props;

        let marker = null;

        if(this.state.locationChosen){
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return (
            <View style={[global.pageContainer,{justifyContent:'center',alignItems: 'center',}]}>
                <Text>Bright</Text>

                 <MapView
                    initialRegion={this.state.focusedLocation}
    
                    style={{width:'100%', height: 400}}
                    onPress={this.pickLocationHandler}
                    ref = {ref => this.map = ref}
                 >

                  {marker}
                
                
                 </MapView>

            </View>

            // <View style={local.container}>
            //     <MapView
            //         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            //         style={local.map}
            //         region={{
            //             latitude: 37.78825,
            //             longitude: -122.4324,
            //             latitudeDelta: 0.015,
            //             longitudeDelta: 0.0121,
            //         }}
            //     >
            //     </MapView>
            // </View>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GPS)
