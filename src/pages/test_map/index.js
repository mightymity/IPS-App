import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from 'react-native-vector-icons/Ionicons';
export class testMap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.cover}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <Ionicons style={styles.close} name="ios-close-circle" size={25} />
      </View>
    )
  }
}

//export default testMap;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: 160,
    height: 200
  },
  cover: {
    flex: 1,
    borderRadius: 5
  },
  close: {
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    color: "tomato"
  }
});