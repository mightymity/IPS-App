/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Tester, TestHookStore } from 'cavy';
import testApp1 from './cavyTest/test'
import testApp2 from './cavyTest/test2'

console.disableYellowBox = true;

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
    render() {
      return (
        <Tester specs={[testApp1,testApp2]} store={testHookStore} startDelay={2000}>
          <App />
        </Tester>
      );
    }
  }

AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(appName, () => AppWrapper);


