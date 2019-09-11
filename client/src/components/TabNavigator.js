import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ResultsScreen from './ResultsScreen';
import FavoritesScreen from './FavoritesScreen';
import MapScreen from './MapScreen';

const TabNavigator = createBottomTabNavigator({
  Results : {
    screen: ResultsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) =>
        <Icon name="list" size={20} color={tintColor} />
    }
  },
  Favorites : {
    screen: FavoritesScreen,
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

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

export default createAppContainer(TabNavigator);