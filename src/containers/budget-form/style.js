import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
  },
  textInput: {
    padding: 5,
    margin: 0,
    marginBottom: 5,
  },
  picker: {
    margin: 0,
  },
  pickerUnderline: {
    flex: 1,
    height: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: colors.whiteE,
    transform: [
      { translateY: -4 }
    ],
  },
  submitBtn: {
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    backgroundColor: colors.greenB,
    marginBottom: 4,
  },
  spinner: {
    alignSelf: 'center'
  },
});
