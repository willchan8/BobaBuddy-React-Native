import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ResultsList from './ResultsList';
import FavoritesList from './FavoritesList';
import MapScreen from './MapScreen';

const TabNavigator = createBottomTabNavigator({
  Results : {
    screen: ResultsList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) =>
        <Icon name="list" size={20} color={tintColor} />
    }
  },
  Favorites : {
    screen: FavoritesList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) =>
        <Icon name="heart" size={20} color={tintColor} />
    }
  },
  Map : {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) =>
        <Icon name="map-marked-alt" size={20} color={tintColor} />
    }
  },
}, {
  initialRouteName: 'Results',
});

export default createAppContainer(TabNavigator);