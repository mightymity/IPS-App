import { StyleSheet } from "react-native";
import {colors} from "../../theme/colors";

export const local = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: 'bold'
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
    marginTop: 50,
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:350,
    height:45,
    //marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
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
}
});
