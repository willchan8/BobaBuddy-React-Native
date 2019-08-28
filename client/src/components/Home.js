import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_KEY from '../assets/API_KEY';
// import boba from '../assets/boba';

export default class Home extends Component {
  constructor(props) {
    super(props)
      this.state = {
      };
  }

  openFavorites() {
    this.props.navigation.navigate(
      'FavoritesList', {
      favorites: this.props.screenProps.favorites,
      handleUnfavorite: this.props.screenProps.handleUnfavorite
      }
    )
  }

  fetchData() {
    if (this.props.screenProps.position) {
      let lat = this.props.screenProps.position.coords.latitude;
      let lng = this.props.screenProps.position.coords.longitude;
      // let location = String(lat) + ',' + String(lng);
      let location = { latitude: lat, longitude: lng };
      
      const config = {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        params: {
          term: 'boba',
          location: location,
        }
      }

      axios.post('https://still-basin-89962.herokuapp.com/', { location: location })
      .then((response) => {
        this.props.screenProps.saveResponse(response.data);
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
      // axios.get('https://api.yelp.com/v3/businesses/search', config)
      // .then((response) => {
      //   this.props.screenProps.saveResponse(response);
      // })
      // .then(() => {
      //   this.props.navigation.navigate(
      //     'TabNavigator', {
      //     results: this.props.screenProps.results,
      //     favorites: this.props.screenProps.favorites,
      //     handleFavorite: this.props.screenProps.handleFavorite
      //     }
      //   )
      // })
      // .catch(error => console.log(error));
    }
  }
    
  render() {
    return (
      <ImageBackground
        source={require('../assets/boba.png')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <Text style={styles.title}>BOBA BUDDY</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.fetchData.bind(this)}
            >
              <Text style={{fontSize: 20, color: 'white'}}>Find Boba!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={this.openFavorites.bind(this)}
            >
              <Text style={{fontSize: 20, color: 'white'}}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',
    top: '45%',
    fontSize: 50,
    fontWeight: "700",
    letterSpacing: 2, 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    textAlign: 'center',
    margin: 10,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  button: {
    top: '27%',
    borderRadius: 7,
    padding: 8,
    margin: 20,
    backgroundColor: 'rgb(37, 160, 205)',
  },
});
