import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.whiteB,
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.whiteD,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 8,
  },

  picker: {
    backgroundColor: colors.whiteC,
    borderColor: colors.whiteD,
    borderRadius: 2,
    borderWidth: 1,
  },

  pickerUnderline: {

    height: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: colors.whiteE,
    transform: [
      { translateY: -4 }
    ],
  },

  pickerUnderline2: {

    height: 1,
    marginHorizontal: 2,
    marginBottom: 2,
    backgroundColor: colors.whiteE,
    transform: [
      { translateY: -4 }
    ],
  },

  //Style Modal

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: (Platform.OS == 'ios') ? 20 : 0

  },

  ModalInsideView: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00BCD4",
    height: 300,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'

  },

  TextStyle: {

    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
    padding: 20,
    textAlign: 'center'

  },

});
