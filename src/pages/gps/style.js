import { StyleSheet } from "react-native";

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

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
});
