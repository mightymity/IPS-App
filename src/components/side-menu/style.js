import { StyleSheet } from "react-native";

import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteC,
    padding: 20,
  },
  navItem: {
    paddingLeft: 0,
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderColor: colors.whiteF
  },
  navItemIcon: {
    width: 24,
    height: 24
  },
  menuTitleContainer: {
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderColor: colors.whiteF
  }
});
