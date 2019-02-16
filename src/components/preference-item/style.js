import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    width: 220,
    padding: 0,
    marginRight: 10,
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
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  detailContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.whiteF,
  },
  addButton: {
    backgroundColor: colors.greenB,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.whiteA
  },
  nameContainer: {
    flexDirection: 'row',
  },
  closeContainer: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: colors.whiteF
  },
});
