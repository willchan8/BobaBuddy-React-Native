import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Hello from './Hello';
import Results from './Results';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home,
  Results,
  Hello,
}, {
  initialRouteName: 'Home'  
})

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
