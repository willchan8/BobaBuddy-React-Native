import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import ResultsList from './ResultsList';
import FavoritesList from './FavoritesList';

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const NavigationConfig = () => {
  return {
    transitionSpec: {
      duration: 50,
    },
  }
}

const AppStackNavigator = createStackNavigator({
  Home,
  ResultsList,
  FavoritesList,
}, {
  initialRouteName: 'Home',
  // transitionConfig: NavigationConfig
})

const AppContainer = createAppContainer(AppStackNavigator);