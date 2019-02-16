import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export const local = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    padding: 0,
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
  cartButton: {
    backgroundColor: colors.greenB,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  cartButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.whiteA
  },
  editButton: {
    backgroundColor: colors.greenB,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.whiteA
  },
  cartButtonContainer: {
    position: 'absolute',
    right: 2,
    bottom: 10,
    backgroundColor: colors.whiteB,

  },

  bagButtonContainer: {
    position: 'absolute',
    right: 45,
    bottom: 10,
    backgroundColor: colors.whiteB

  },

  storeIcon: {
    width: 30,
    height: 30,
  },

  cartIcon: {
    width: 30,
    height: 30,
  },

});
