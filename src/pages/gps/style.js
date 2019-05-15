import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  heading1: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
});
