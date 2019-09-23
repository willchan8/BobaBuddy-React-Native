import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import API_KEY from '../assets/API_KEY';

export default class HomeButtons extends Component {
  constructor(props) {
    super(props)
  }

  openFavorites() {
    this.props.navigation.navigate(
      'FavoritesScreen', {
      favorites: this.props.favorites,
      handleUnfavorite: this.props.handleUnfavorite
      }
    )
  }

  showResults() {
    if (this.props.position) {
      let lat = this.props.position.coords.latitude;
      let lng = this.props.position.coords.longitude;
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
      //   this.props.saveResponse(response.data);
      // })
      axios.get('https://api.yelp.com/v3/businesses/search', config)
      .then((response) => {
        this.props.saveResponse(response);
      })
      .then(() => {
        this.props.navigation.navigate(
          'TabNavigator', {
          results: this.props.results,
          favorites: this.props.favorites,
          handleFavorite: this.props.handleFavorite
          }
        )
      })
      .catch(error => console.log(error));
    }
  }
    
  render() {
    return (
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
    );
  }
}

const styles = StyleSheet.create({
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