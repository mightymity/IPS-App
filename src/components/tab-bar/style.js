import { StyleSheet } from "react-native";

import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteB,
    height: 50,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    backgroundColor: colors.greenD,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabIcon: {
    width: 18,
    height: 18,
  },
  innerTabView: {
    alignItems: 'center',
    paddingTop: 5
  }
});
