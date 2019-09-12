import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      // let location = { latitude: lat, longitude: lng };
      
      const config = {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        params: {
          term: 'boba',
          location: location,
        }
      }

      // axios.post('https://still-basin-89962.herokuapp.com/', { location: location })
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
    return (
      <ImageBackground
        source={require('../assets/boba.jpg')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <Text style={styles.title}>BOBA BUDDY</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.4}
              onPress={this.showResults.bind(this)}
            >
              <View style={styles.buttonContainer}>
                <Icon name="search" size={20} />
                <Text style={styles.buttonText}>Find Boba!</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.4}
              onPress={this.openFavorites.bind(this)}
            >
              <View style={styles.buttonContainer}>
                <Icon name="heart" size={20} color="red" />
                <Text style={styles.buttonText}>Favorites</Text>
              </View>
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
    fontWeight: '700',
    letterSpacing: 2, 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    textAlign: 'center',
    margin: 10,
  },

  buttonsRow: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    top: '27%',
    borderRadius: 7,
    padding: 8,
    margin: 20,
    backgroundColor: 'rgb(37, 160, 205)',
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 5
  }
});
