import React, { Component } from 'react';
import {
  View,
} from 'react-native';

// Redux Store
import { Provider } from "react-redux";
import { store as appStore } from './src/_helpers'

// Routing
import { Router, Stack, Scene, Drawer, Tabs } from "react-native-router-flux";

// Scenes
import Home from "./src/pages/home";
import CreateTodo from "./src/pages/create_todo";
import BLE from "./src/pages/ble";
import GPS from "./src/pages/gps";
import Patient from "./src/pages/patient";
import Caretaker from "./src/pages/caretaker";
import EditMap from "./src/pages/edit-map";
import patient_regis from "./src/pages/patient-register"
import caretaker_regis from "./src/pages/caretaker-register"
import patient_edit from "./src/pages/patient-edit"
import caretaker_edit from "./src/pages/caretaker-edit"
import Login from "./src/pages/login"
import test_map from "./src/pages/test_map"
import search_hospital from "./src/pages/search-hospital"
import modal from "./src/pages/testModal"
import search_patient from "./src/pages/search-patient"
import patient_ble from "./src/pages/patient-ble"
import patient_gps from "./src/pages/patient-gps"
import search_caretaker from "./src/pages/search-caretaker"

import TestFeature from "./src/pages/testFeature"
import RealSearch from "./src/containers/search"
import TestFeature2 from "./src/pages/testFeature2"
import Search_GPS from "./src/containers/search-gps"

// Components
import SideMenu from "./src/components/side-menu";
import TabBar from "./src/components/tab-bar";
import IconButton from "./src/components/icon-button";

// Theme
import { colors } from "./src/theme";
import { Actions } from "react-native-router-flux";

// // Firebase
// import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyCEwsnw51LHiL2entmVNcsZ95UQApv7BQ0",
//   authDomain: "ips-app-ce85b.firebaseapp.com",
//   databaseURL: "https://ips-app-ce85b.firebaseio.com",
//   projectId: "ips-app-ce85b",
//   storageBucket: "ips-app-ce85b.appspot.com",
//   messagingSenderId: "131590502729"
// };

// firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;

class App extends Component {
  state = {}
  render() {

    // if (this.props.user.loggedIn == false){
    //   const clickable = false
    // }

    // else if (this.props.user.loggedIn == true){
    //   const clickable = true
    // }
    return (
      <Provider store={appStore}>
        <Router >
          <Scene key="Root" hideNavBar={true} >

            <Scene
              title="Login"
              key="login"
              component={Login}

            />

            {/* <Scene
            title="Test Modal"
            key="modal"
            component={modal}
          /> */}


            {/* <Scene
              title="TF-BLE"
              key="tf"
              component={TestFeature}
            /> */}



            <Drawer
              key="drawer"
              drawerPosition="left"
              headerMode="float"
              drawerWidth={200}
              contentComponent={SideMenu}
              titleStyle={{ color: colors.whiteB, fontFamily: 'Kanit-SemiBold', fontWeight: 'normal' }}
              renderLeftButton={() =>
                <IconButton size="sm"
                  onPress={() => Actions.drawerOpen()}
                  imgPath={require('./src/assets/icons/hamburger-light.png')}
                />}
              navigationBarStyle={{ backgroundColor: colors.purpleA }}
              backButtonTintColor={colors.whiteA}
              rightButtonTintColor={colors.whiteB}

            >

              {/* <Scene 
              title="test"
              key="test_map"
              component={test_map}
            /> */}

              

              <Scene
                title="BLE"
                key="tf"
                component={TestFeature}
              />

              <Scene
                title="Patient"
                key="search_patient"
                component={search_patient}
              />      

              <Scene
                title="GPS"
                key="tf2"
                component={TestFeature2}

              />

              {/* <Scene
              title="TF-BLE"
              key="tf"
              component={TestFeature}
            /> */}

              {/* <Scene
                title="BLE"
                key="ble"
                component={BLE}
              />

              <Scene
                title="GPS"
                key="gps"
                component={GPS}
              />

              <Scene
                title="Patient"
                key="patient"
                component={Patient}

              /> */}

              {/* <Scene
                title="Caretaker"
                key="caretaker"
                component={Caretaker}
              /> */}

              {/* <Scene
                title="Edit Map"
                key="edit-map"
                component={EditMap}
              /> */}

              {/* <Scene
                title="Home"
                // drawerLockMode="locked-closed"
                // renderRightButton={() => <View />}
                // back={true} 
                key="home"
                component={Home}
              // renderBackButton={() =>
              //   <IconButton onPress={() => { Actions.pop() }}
              //     imgPath={require('./src/assets/icons/back.png')} />}
              />

              <Scene
                title="Create Todo"
                key="create_todo"
                component={CreateTodo}
              /> */}

              <Scene
                title="Caretaker Registration"
                key="caretaker_regis"
                component={caretaker_regis}
              />

              <Scene
                title="Patient Registration"
                key="patient_regis"
                component={patient_regis}
              />

              <Scene
                title="Patient Edit"
                key="patient_edit"
                component={patient_edit}
              />

              <Scene
                title="Caretaker Edit"
                key="caretaker_edit"
                component={caretaker_edit}
              />

              <Scene
                title="Search from Hospital"
                key="search_hospital"
                component={search_hospital}
              />

              <Scene
                key="realSearch"
                component={RealSearch}
              />

              <Scene
                key="search_gps"
                component={Search_GPS}
              />

              <Scene
                title="Patient"
                key="patient_ble"
                component={patient_ble}
              />

              <Scene
                title="Patient"
                key="patient_gps"
                component={patient_gps}
              />    

              <Scene
                title="Caretaker"
                key="search_caretaker"
                component={search_caretaker}
              /> 



            </Drawer>
          </Scene>

        </Router>
      </Provider >
    );
  }
}

export default App;