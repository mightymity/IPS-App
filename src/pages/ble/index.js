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
        patients: [{ name: "Prayut JunOK", duty: "Uncle near home" },
        { name: "Pravitt TheWatch", duty: "Watcher" },
        { name: "Suthep T.", duty: "Karawa Land" }],

        buildings: [{
            name: 'IC Building',
            floors: [
                {
                    number: '6',
                    img: 'abc'
                },
                {
                    number: '8',
                    img: 'abc'
                }
            ]
        },
        {
            name: 'ECC Building',
            floors: [
                {
                    number: '3',
                    img: 'abc'
                },
                {
                    number: '5',
                    img: 'abc'
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

                <SearchPatient patients={this.state.patients}/>
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
