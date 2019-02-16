import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    padding: 0,
  },
  nameContainer: {
    flex: 1,
    paddingTop: 5,
    justifyContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.whiteA,
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  detailContainer: {
    flex: 2,
    paddingTop: 2,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.whiteF,
  },
  addButton: {
    backgroundColor: colors.greenB,
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
