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
        name: '',
        description: ''
    }

    onChangeName = (value) => {
        this.setState({ name: value })
    }

    render() {
        const { todos } = this.props;
        const black = '#000000';
        const { name, description } = this.state;
        return (
            // <ScrollView contentContainerStyle={global.pageScrollView}>
            // <View style={[global.pageContainer, {flexDirection: 'column' }]}>
            //     <View style={{ flex: 1, flexDirection: 'row', }}>
            //         <View style={{ flex: 5, paddingLeft: 20, backgroundColor: 'powderblue' }}>
            //             {/* <AppText size="l" value="Search" center color={black} /> */}
            //             <TextInput value={name} placeholder="Name" underlineColorAndroid={colors.greenA}
            //                 onChangeText={(value) => this.onChangeName(value)} />
            //         </View>
            //         <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, }}>
            //             <AppText size="l" value="Picture" center color={black} />
            //         </View>

            //     </View>
            //     <View style={{ flex: 1, flexDirection: 'row' }}>
            //         <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 20, }}>
            //             <AppText size="xxl" value="Overview" center bold color={black} />
            //         </View>
            //     </View>
            //     <View style={{ flex: 4, flexDirection: 'row' }}>
            //         <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, }}>
            //             <AppText size="xxl" value="Choose floor" center bold color={black} />
            //         </View>
            //     </View>
            //     <View style={{ flex: 6 }}>
            //         <AppText size="xxxl" value="Indoor picture" center bold color={black} />
            //         {/* <Image source={require('./' + icon + '.png')} style={{resizeMode:'contain'}}/> */}
            //     </View>
            // </View>
            // </ScrollView>

            <ScrollView contentContainerStyle={global.pageScrollView}>
            
                <SearchPatient />
                <IndoorMap/>
                
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
