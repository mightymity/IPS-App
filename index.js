/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import 'core-js/es6/symbol';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'core-js/modules/es6.object.set-prototype-of';


global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');


Object.setPrototypeOf =
  Object.setPrototypeOf ||
  function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };

AppRegistry.registerComponent(appName, () => App);
