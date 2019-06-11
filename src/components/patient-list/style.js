import { StyleSheet } from "react-native";
import { colors } from "../../theme";


export const local = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteB,
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    margin: 10,
  },
 
  SectionStyle: {
    flexDirection: 'row',
    alignItems:'center'
    //justifyContent: 'center',
    //backgroundColor: '#fff',
    // height: 40,
    // margin: 10,
  },
 
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
