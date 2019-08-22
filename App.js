import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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

const NavigationConfig = () => {
  return {
    transitionSpec: {
      duration: 50,
      // easing: Easing.out(Easing.poly(4)),
      // timing: Animated.timing,
      // useNativeDriver: true,
    },
    // screenInterpolator: sceneProps => {      
    //   const { layout, position, scene } = sceneProps

    //   const thisSceneIndex = scene.index
    //   const width = layout.initWidth

    //   const translateX = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
    //     outputRange: [width, 0],
    //   })

    //   return { transform: [ { translateX } ] }
    // },
  }
}

const AppStackNavigator = createStackNavigator({
  Home,
  Results,
  Hello,
}, {
  initialRouteName: 'Home',
  // transitionConfig: NavigationConfig
})

const AppContainer = createAppContainer(AppStackNavigator);