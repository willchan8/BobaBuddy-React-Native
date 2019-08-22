import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import ResultsList from './ResultsList';

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
}, {
  initialRouteName: 'Home',
  // transitionConfig: NavigationConfig
})

const AppContainer = createAppContainer(AppStackNavigator);