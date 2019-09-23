import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import FavoritesScreen from './FavoritesScreen';
import TabNavigator from './TabNavigator';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      positionLoading: true,
      results: [],
      favorites: []
    }
    this.saveResponse = this.saveResponse.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          position: position,
          positionLoading: false,
        });
        console.log(this.state.position.coords);
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000}
    );

    this.getFavorites();
  }

  saveResponse(response) {
    this.setState({
      // For Yelp Fusion
      results: response.data.businesses

      // For GraphQL
      // results: response.data.search.business
    })
  }

  getFavorites() {
    axios.get('https://bobabuddy.herokuapp.com/favorites')
    .then((response) => {
      this.setState({ favorites: response.data })
    })
    .catch(error => console.log(error));
  }

  handleFavorite(item) {
    axios.post('https://bobabuddy.herokuapp.com/favorites', { favorite: item })
    .then(() => {
      this.getFavorites()
    })
    .catch(error => console.log(error));
  }

  handleUnfavorite(item) {
    axios.delete('https://bobabuddy.herokuapp.com/favorites', { data: item } )
    .then(() => {
      this.getFavorites()
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <AppContainer 
        screenProps={{
          ...this.state,
          saveResponse: this.saveResponse,
          handleFavorite: this.handleFavorite,
          handleUnfavorite: this.handleUnfavorite,
        }}
      />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      headerTitle: 'Find Boba',
    },
  },
  FavoritesScreen: {
    screen: FavoritesScreen,
    navigationOptions: {
      headerTitle: 'My Favorites',
    },
  },
}, {
  initialRouteName: 'Home',
})

const AppContainer = createAppContainer(AppStackNavigator);