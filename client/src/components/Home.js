import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import HomeButtons from './HomeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import API_KEY from '../assets/API_KEY';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  openFavorites() {
    this.props.navigation.navigate(
      'FavoritesScreen', {
      favorites: this.props.screenProps.favorites,
      handleUnfavorite: this.props.screenProps.handleUnfavorite
      }
    )
  }

  showResults() {
    if (this.props.screenProps.position) {
      let lat = this.props.screenProps.position.coords.latitude;
      let lng = this.props.screenProps.position.coords.longitude;
      let location = lat + ',' + lng;
      
      const config = {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        params: {
          term: 'boba',
          location: location,
        }
      }

      // axios.post('https://bobabuddy.herokuapp.com/', { location: location })
      // .then((response) => {
      //   this.props.screenProps.saveResponse(response.data);
      // })
      axios.get('https://api.yelp.com/v3/businesses/search', config)
      .then((response) => {
        this.props.screenProps.saveResponse(response);
      })
      .then(() => {
        this.props.navigation.navigate(
          'TabNavigator', {
          results: this.props.screenProps.results,
          favorites: this.props.screenProps.favorites,
          handleFavorite: this.props.screenProps.handleFavorite
          }
        )
      })
      .catch(error => console.log(error));
    }
  }
    
  render() {
    const { position, positionLoading, favorites, saveResponse, handleFavorite, handleUnfavorite } = this.props.screenProps;
    return (
      <ImageBackground style={styles.background} source={require('../assets/boba.png')}>
        <View style={styles.container}>
          <Text style={styles.title}>BOBA BUDDY</Text>
          {
            positionLoading ? 
            <View style={{top: '13.5%'}}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Retrieving Location...</Text>
            </View> :
            <HomeButtons 
              position={position}
              favorites={favorites}
              saveResponse={saveResponse}
              handleFavorite={handleFavorite}
              handleUnfavorite={handleUnfavorite}
              navigation={this.props.navigation}
            />
          }
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',
    top: '45%',
    fontSize: 50,
    fontWeight: '700',
    letterSpacing: 2, 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    textAlign: 'center',
    margin: 10,
  },
});
