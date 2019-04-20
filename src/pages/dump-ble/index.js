import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Search from "../../containers/search"
import { local } from "./style";
import { Actions } from 'react-native-router-flux';

export class DumpBLE extends Component {
  state = {
    show: true
  }

 
  render() {
    return (
   <View></View>
    
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    zIndex:1

  },

  overview: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DumpBLE)
