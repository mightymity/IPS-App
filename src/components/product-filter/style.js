import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  customCard: {
    padding: 0,
    borderWidth: 0,
    marginBottom: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  modalContainer: {
    backgroundColor: colors.whiteC,
    padding: 10,
    borderRadius: 4,
  },
  modalTitle: {
    paddingLeft: 10
  }
});
