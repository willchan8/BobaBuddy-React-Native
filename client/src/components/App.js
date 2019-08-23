import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import FavoritesList from './FavoritesList';
import TabNavigator from './TabNavigator';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home,
  TabNavigator,
  FavoritesList,
}, {
  initialRouteName: 'Home',
})

const AppContainer = createAppContainer(AppStackNavigator);