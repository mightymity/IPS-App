import React, { Component } from 'react'
import { View, Text, FlatList, Image, TextInput, ScrollView } from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global, colors } from '../../theme'

import AppText from "../../components/app-text";

import SearchPatient from "../../containers/search-patient"
import IndoorMap from "../../containers/indoor-map"



export class BLE extends Component {

    state = {
        patientss: [{ name: "Prayut JunOK", duty: "Uncle near hom" },
        { name: "Pravitt TheWatch", duty: "Watcher" },
        { name: "Suthep T.", duty: "Karawa Land" }],

        buildings: [{
            name: 'IC Building',
            floors: [
                {
                    number: '6',
                    img: require('../../assets/images/ic-floor6.png')
                },
                {
                    number: '8',
                    img: require('../../assets/images/ic-floor8.png')
                }
            ]
        },
        {
            name: 'ECC Building',
            floors: [
                {
                    number: '3',
                    img: require('../../assets/images/ecc-floor3.png')
                },
                {
                    number: '5',
                    img: require('../../assets/images/ecc-floor5.png')
                }
            ]
        }
        ]

    }

    onChangeName = (value) => {
        this.setState({ name: value })
    }

    render() {
        const { todos } = this.props;
        const black = '#000000';
        const { name, description, buildings } = this.state;
        // const currentBuilding = buildings[currentBuildingIndex];
        return (

            <ScrollView contentContainerStyle={global.pageScrollView}>

                <SearchPatient patientss={this.state.patientss}/>
                <IndoorMap buildings={this.state.buildings}/>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BLE)
