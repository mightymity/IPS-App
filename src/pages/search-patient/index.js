import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { local } from './style'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";
import { selectPatientToTrackGps } from '../../actions/gps.action';
import { selectPatientToTrackBle } from '../../actions/ble.action';
import { patientActions } from '../../actions/patient.action';
import { db } from '../../services/firebase_demo';



class Search_Patient extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = props;
        //dispatch(patientActions.updatePatientList())
        this.props.updateG()
        this.props.updateB()

        this.state = {
            curr: '',
            query: '',

            fullData2: [],
            filteredData2: [],
            status: '',
        }
    }

    componentWillMount() {
        const temp = this
        db.ref('/patients').on("value", function (snapshot) {
            let data = snapshot.val();
            let items = Object.values(data);
            console.log('item = ', items)
            temp.setState({ fullData2: items })
            temp.setState({ filteredData2: items })
        })

    }

    componentWillReceiveProps = (nextProps) => {
        const temp = this
        if (this.state.query === '') {
            db.ref('/patients').on("value", function (snapshot) {
                let data = snapshot.val();
                let items = Object.values(data);
                temp.setState({ filteredData2: items })
            })
        }
    }


    contains2 = ({ name, id }, query) => {
        const n = name.toLowerCase()
        const i = String(id)
        if (n.includes(query) || i.includes(query)) {
            return true;
        }

        return false;
    };

    handleSearch2 = (text) => {
        const formatQuery = text.toLowerCase();
        // console.log(formatQuery)
        db.ref('/patients').on("value", function (snapshot) {
            let data = snapshot.val();
            return items = Object.values(data);

        })

        const data = _.filter(items, user => {
            return this.contains2(user, formatQuery);
        })

        console.log('formatQuery: ', formatQuery)
        this.setState({ query: formatQuery, filteredData2: data });
    }


    selectPatient2 = (item) => {
        if (item.status == 'out') {
            this.props.selectGPS(item.id);
            Actions.jump('patient_gps');
        }

        else if (item.status == 'in') {
            this.props.selectBLE(item.id);
            setTimeout(() => { Actions.jump('patient_ble') }, 1000)
        }

    }

    goToReg = () => {
        Actions.jump('patient_regis')
      }
    
    goToEdit = () => {
    const { curr } = this.state
    this.props.selectEdit(curr)
    //this.props.dispatch(patientActions.selectEditPatient(curr))
    Actions.jump('patient_edit');
    }

    onChangeId = (value) => {
    this.setState({ curr: value })
    this.changeCurrent()
    }

    changeCurrent = () => {
    Alert.alert(

        // This is Alert Dialog Title
        'Message',

        // This is Alert Dialog Message. 
        'Edit this patient information?',
        [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToEdit() },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


        ],
        { cancelable: false }

    )
    }



    onDeletePatient = (index, b, g) => {
    Alert.alert(

        // This is Alert Dialog Title
        b,

        // This is Alert Dialog Message. 
        g,
        [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.deletePatient(index, b, g) },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


        ],
        { cancelable: false }

    )

    }

    deletePatient = (index, b, g) => {
        this.props.delete(index, b, g)
    //this.props.dispatch(patientActions.deletePatientByIndex(index));
    }

    //   goBack = () => {
    //     this.setState({ query: '' })
    //     Actions.jump('tf2')
    //   }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        const { query } = this.state
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                {/* <View>
          <TouchableOpacity onPress={() => { this.goBack() }}>
            <Icon name="arrow-left" size={25} />
          </TouchableOpacity>
        </View> */}
                <View style={{ flex: 1 }}>
                    <SearchBar placeholder="Search Patient..." lightTheme round onChangeText={this.handleSearch2} value={query} />
                </View>
            </View>
        )
    };


    render() {
        return (
            // <View>
            <View style={local.view} contentContainerStyle={global.pageScrollView}>
                <ScrollView>
                <FlatList
                    data={this.state.filteredData2}
                    renderItem={({ item }) => (
                        <ListItem
                            //roundAvatar
                            title={`${item.name}`}
                            // subtitle={item.email}
                            //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={() => { this.selectPatient2(item) }}
                            subtitle={
                                <View>
                                    <Text>BLE: {`${item.BLE.name}`}     GPS: {`${item.GPS.name}`}</Text>
                                </View>
                            }
                            leftAvatar={{
                                source: item.avatar_url && { uri: item.avatar_url },
                                title: item.name[0]
                            }}
                            rightElement={
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.onChangeId(item.id)}>
                                        <Image style={local.image} source={require('../../assets/icons/edit.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onDeletePatient(item.id, item.BLE.name, item.GPS.name)}>
                                        <Image style={local.image} source={require('../../assets/icons/remove.png')} />
                                    </TouchableOpacity>

                                </View>
                            }
                        />
                    )}
                    //keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader()}
                />
                </ScrollView>

                <View style={{
                    alignSelf: 'flex-end',
                    // alignItems: 'flex-end',
                    //padding: 100,
                    //marginTop: 300,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity onPress={() => { Actions.jump('patient_regis') }}>
                        <Image style={{ height: 40, width: 40 }} source={require('../../assets/icons/plus.png')} />
                    </TouchableOpacity>
                </View>

            </View>


            //</View>


        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    patients: state.patients,
    caretakers: state.caretakers,
    gps: state.gps
})

const mapDispatchToProps = (dispatch) => ({
    selectGPS: item => dispatch(selectPatientToTrackGps(item)),
    selectBLE: item => dispatch(selectPatientToTrackBle(item)),
    selectEdit: item => dispatch(patientActions.selectEditPatient(item)),
    delete: (index, b, g) => dispatch(patientActions.deletePatientByIndex(index, b, g)),
    updateB: () => dispatch(patientActions.updateBle()),
    updateG: () => dispatch(patientActions.updateGps()),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Search_Patient)