import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  spinner: {
    flex: 1,
    alignSelf: 'center'
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.greenB,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  saveIcon: {
    width: 32,
    height: 32,
    tintColor: colors.whiteA
  },
  modalContainer: {
    borderWidth: 0,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: colors.whiteC,
    padding: 10,
    borderRadius: 4,
  },
  modalTitle: {
    paddingLeft: 5,
  },
  textInput: {
    color: colors.whiteF,
    padding: 5,
  },
  confirmContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: colors.greenB,
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
});
