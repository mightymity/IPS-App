import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 12,
  },

  partition: {
    flexDirection: "row",
  },

  section1: {
    flex: 7,
    flexDirection: "column"
  },

  sectionName: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  sectionPrice: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  section2: {
    flex: 3,
    flexDirection: "column"
  },

  sectionMode: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  sectionDate: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  modeIcon: {
    borderRadius: 100,
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center'
  },

});