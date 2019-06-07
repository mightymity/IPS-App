import { StyleSheet } from "react-native";
import {colors} from "../../theme/colors";

export const local = StyleSheet.create({
  heading1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center'
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    
  },
  textInput: {
    alignSelf: 'stretch',
    //height: 40,
    marginTop: 4,
    color: '#11294f',
    borderBottomColor: '#199187',
    borderBottomWidth: 1
  },

  button: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: colors.purpleA,
    marginTop: 30,
    
  },

  btnText:{
    color: '#fff',
    fontWeight: 'bold',
  },

  search: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:350,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },

  searchText: {
    marginTop: 25,
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },

  input: {
    marginTop: 4,
  },
});
