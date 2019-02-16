import {
  StyleSheet
} from 'react-native';

import { colors } from "./colors";

export const global = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.whiteD,
  },
  pageScrollView: {
    flexGrow: 1,
    padding: 10
  },
  pageFlatList: {
    padding: 10,
  },
  colContent: {
    flexDirection: 'row'
  },
  centerVertical: {
    justifyContent: 'center'
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
  modalContainer: {
    backgroundColor: colors.whiteC,
    padding: 10,
    borderRadius: 4,
  },
  listItem: {
    backgroundColor: colors.whiteB,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: colors.whiteD,
    padding: 5,
  }
});