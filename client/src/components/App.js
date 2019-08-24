import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import FavoritesList from './FavoritesList';
import TabNavigator from './TabNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      favorites: []
    }
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        console.log(this.state.position.coords);
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  handleFavorite(item) {
    this.setState(prevState => ({
      favorites: [...prevState.favorites, item]
    })
    )
  }

  handleUnfavorite(item) {
    this.setState({
      favorites: this.state.favorites.filter(favorite => favorite.id !== item.id)
    })
  }

  render() {
    return (
      <AppContainer 
        screenProps={{
          ...this.state,
          handleFavorite: this.handleFavorite,
          handleUnfavorite: this.handleUnfavorite,
        }}
      />
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