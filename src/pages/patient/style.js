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
  }
});
