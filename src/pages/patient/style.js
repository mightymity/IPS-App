import { StyleSheet } from "react-native";
import {colors} from "../../theme/colors";

export const local = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: 'bold'
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

  view: {
    flex: 3,
    backgroundColor: colors.whiteB,
  },
  
  image:{
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    //marginTop: 26,
  }

});
