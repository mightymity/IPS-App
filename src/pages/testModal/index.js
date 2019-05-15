import React, { Component } from 'react'
import {
  View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator
  , Image, StyleSheet, TouchableHighlight, Button, Modal
} from 'react-native'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { local } from './style'
import { global } from '../../theme'

import TodoItem from '../../components/todo-item'
import { Actions } from 'react-native-router-flux'
// import Modal from 'react-native-modal';

class ModalExample extends Component {
  constructor(props) {
 
    super(props);
 
    this.state = { 
        
        ModalVisibleStatus: false 
    };
 
  }
 
  ShowModalFunction(visible) {
 
    this.setState({ModalVisibleStatus: visible});
    
  }
 
 render() {
   return (
 
      <View style={styles.MainContainer}>
 
        <Modal
          transparent={true}
 
          animationType={"fade"}
 
          visible={this.state.ModalVisibleStatus}
 
          onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
 
 
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
 
 
                <View style={styles.ModalInsideView}>
 
 
                    {/* Put All Your Components Here, Which You Want To Show Inside The Modal. */}
 
                    <Text style={styles.TextStyle}>Text Component With Some Sample Text In Modal. </Text>
 
                    <Button  title="Click Here To Hide Modal" onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } />
 
                    {/* Put All Your Components Here, Which You Want To Show Inside The Modal. */}
 
 
                </View>
 
            </View>
 
 
        </Modal>
 
        <Button onPress={() => { this.ShowModalFunction(true) }} title="Click Here To Show Modal" />
         
 
      </View>
 
           
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
    
flex:1,
justifyContent: 'center',
alignItems: 'center',
// marginTop: (Platform.OS == 'ios') ? 20 : 0
 
},
 
ModalInsideView:{
 
  justifyContent: 'center',
  alignItems: 'center', 
  backgroundColor : "#00BCD4", 
  height: 300 ,
  width: '90%',
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#fff'
 
},
 
TextStyle:{
 
  fontSize: 20, 
  marginBottom: 20, 
  color: "#fff",
  padding: 20,
  textAlign: 'center'
 
}
 
});

const mapStateToProps = (state) => ({
  todos: state.todos,
  patients: state.patients,
  caretakers: state.caretakers
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(ModalExample)
