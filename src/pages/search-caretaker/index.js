import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { local } from './style'

import Icon from 'react-native-vector-icons/FontAwesome'

import _ from "lodash";
// import { selectPatientToTrackGps } from '../../actions/gps.action';
// import { selectPatientToTrackBle } from '../../actions/ble.action';
import { caretakerActions } from '../../actions/caretaker.action';
import { db } from '../../services/firebase_demo';



class Search_Caretaker extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = props;
        //dispatch(patientActions.updatePatientList())


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
        db.ref('/caretakers').on("value", function (snapshot) {
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
            db.ref('/caretakers').on("value", function (snapshot) {
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
        db.ref('/caretakers').on("value", function (snapshot) {
            let data = snapshot.val();
            return items = Object.values(data);

        })

        const data = _.filter(items, user => {
            return this.contains2(user, formatQuery);
        })

        console.log('formatQuery: ', formatQuery)
        this.setState({ query: formatQuery, filteredData2: data });
    }


    selectCaretaker2 = (item) => {
        const i = 'ID: ' + item.id
        const n = 'Name: ' + item.name
        const p = 'Patient: ' + item.patient
        const detail = i + '\n' + n + '\n' + p
        console.log(detail)
        Alert.alert(

            // This is Alert Dialog Title
            //'Message',
            'Detail',
            // This is Alert Dialog Message. 
            detail,
            [
            // First Text Button in Alert Dialog.
            { text: 'YES'},
            
    
    
            ],
            { cancelable: false }
    
        )

    }

    goToEdit = () => {
        const { curr } = this.state.curr
        console.log('this is curr: ', curr)
        this.props.dispatch(caretakerActions.selectEditCaretaker(curr))
        Actions.jump('caretaker_edit');
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
        'Edit this caretaker information?',
        [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.goToEdit() },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


        ],
        { cancelable: false }

    )
    }

    onDeleteCaretaker = (index) => {
    Alert.alert(

        // This is Alert Dialog Title
        'Message',

        // This is Alert Dialog Message. 
        'Delete this caretaker?',
        [
        // First Text Button in Alert Dialog.
        { text: 'YES', onPress: () => this.deleteCaretaker(index) },
        { text: 'NO', onPress: () => console.log('Cancel Pressed!'), style: 'cancel' },


        ],
        { cancelable: false }

    )

    }

    deleteCaretaker = (index) => {
    this.props.dispatch(caretakerActions.deleteCaretakerByIndex(index));
    }

    goToReg = () => {
    Actions.jump('caretaker_regis')
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
                    <SearchBar placeholder="Search Caretaker..." lightTheme round onChangeText={this.handleSearch2} value={query} />
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
                        <ListItem bottomDivider={true}
                        title={`${item.name}`}
                            // subtitle={item.email}
                            //leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                        containerStyle={{ borderBottomWidth: 0 }}
                        onPress={() => { this.selectCaretaker2(item) }}
                        subtitle={
                            <View>
                            <Text>Patient: {`${item.patient}`}</Text>
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
                            <TouchableOpacity onPress={() => this.onDeleteCaretaker(item.id)}>
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
                    <TouchableOpacity onPress={() => { Actions.jump('caretaker_regis') }}>
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

// const mapDispatchToProps = (dispatch) => ({
//     selectGPS: item => dispatch(selectPatientToTrackGps(item)),
//     selectBLE: item => dispatch(selectPatientToTrackBle(item)),
// })

export default connect(mapStateToProps)(Search_Caretaker)