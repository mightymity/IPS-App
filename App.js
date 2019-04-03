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


// Components
import SideMenu from "./src/components/side-menu";
import TabBar from "./src/components/tab-bar";
import IconButton from "./src/components/icon-button";

// Theme
import { colors } from "./src/theme";
import { Actions } from "react-native-router-flux";


class App extends Component {
  state = {}
  render() {
    return (
      <Provider store={appStore}>
        <Router >
        
          <Drawer
            key="Root"
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
          
            <Scene
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
            />

            <Scene
              title="Caretaker"
              key="caretaker"
              component={Caretaker}
            />

            <Scene
              title="Edit Map"
              key="edit-map"
              component={EditMap}
            />

            <Scene
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
            />

            <Scene 
            title = "Caretaker Registration"
            key = "caretaker_regis" 
            component = {caretaker_regis} 
            />

            <Scene 
            title = "Patient Registration"
            key = "patient_regis" 
            component = {patient_regis}  
            />

            <Scene 
            title = "Patient Edit"
            key = "patient_edit" 
            component = {patient_edit}  
            />    

            <Scene 
            title = "Caretaker Edit"
            key = "caretaker_edit" 
            component = {caretaker_edit}  
            /> 

          </Drawer>
        </Router>
      </Provider >
    );
  }
}

export default App;