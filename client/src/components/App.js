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
      favorites: [],
      sortResultsBy: null,
      sortFavoritesBy: null,
    }
    this.saveResponse = this.saveResponse.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          position: position,
          positionLoading: false,
        });
      },
      (error) => alert(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
    );

    this.getFavorites();
  }

  saveResponse(response) {
    this.setState({
      results: response.data.businesses
    })
  }

  getFavorites() {
    axios.get('https://bobabuddy.herokuapp.com/favorites')
    .then((response) => {
      this.setState({ favorites: response.data })
    })
    .catch(error => alert(error));
  }

  handleFavorite(item) {
    axios.post('https://bobabuddy.herokuapp.com/favorites', { data: item })
    .then(() => {
      this.getFavorites();
    })
    .catch(error => alert(error));
  }

  handleUnfavorite(item) {
    axios.delete('https://bobabuddy.herokuapp.com/favorites', { data: item } )
    .then(() => {
      this.getFavorites();
    })
    .catch(error => alert(error));
  }

  handleSort(sortCriteria, screen) {
    const { results, favorites } = this.state;
    const listCopy = (screen === 'results') ? [...results] : [...favorites];

    const sortLogic = () => {      
      switch (sortCriteria) {
        case 'A-Z':
          listCopy.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
            return 0;
          });
          break;
        case 'Rating':
          listCopy.sort((a, b) => {
            if (a.rating > b.rating) { return -1 }
            if (a.rating < b.rating) { return 1 }
            return 0;
          });
          break;
        case 'Reviews':
          listCopy.sort((a, b) => {
            if (a.review_count > b.review_count) { return -1 }
            if (a.review_count < b.review_count) { return 1 }
            return 0;
          });
          break;
        case 'Distance':
          listCopy.sort((a, b) => {
            if (a.distance < b.distance) { return -1 }
            if (a.distance > b.distance) { return 1 }
            return 0;
          });
          break;
      }
    };
    
    if (screen === 'results') {
      this.setState({ sortResultsBy: sortCriteria }, 
      () => {
        sortLogic();
        this.setState({ results: listCopy });
      });
    } else {
      this.setState({ sortFavoritesBy: sortCriteria }, 
      () => {
        sortLogic();
        this.setState({ favorites: listCopy });
      });
    }
  }



  render() {
    return (
      <AppContainer 
        screenProps={{
          ...this.state,
          saveResponse: this.saveResponse,
          handleFavorite: this.handleFavorite,
          handleUnfavorite: this.handleUnfavorite,
          handleSort: this.handleSort,
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