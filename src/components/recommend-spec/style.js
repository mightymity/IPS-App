import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 0,
    paddingVertical: 0,
    backgroundColor: colors.whiteB,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.whiteD,
  },
  id: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteC,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  detail: {
    flex: 1,
    padding: 10
  },
  scoreContainer: {
  },
  scoreTitle: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
});
