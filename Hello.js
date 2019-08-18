import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class Hello extends Component {
  static navigationOptions = {
    title: 'Hello',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HELLO!!!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  }
});