import React, { Component } from 'react';
import { Platform, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_KEY from './API_KEY'

export default class Home extends Component {
  constructor(props) {
  super(props)
    this.state = {
      position: 'unknown'
    };
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

  fetchData() {
    var lat = this.state.position.coords.latitude;
    var lng = this.state.position.coords.longitude;
    
    const config = {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        term: 'boba',
        location: String(lat) + ',' + String(lng)
      }
    }

    axios.get('https://api.yelp.com/v3/businesses/search', config)
    .then((response) => {
      this.props.navigation.push(
        'Results',
        {response: response}
      )
    })
    .catch(error => console.log(error));
  }
    
  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./boba.png')}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Boba Buddy</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.fetchData.bind(this)}
          >
            <Text style={{fontSize: 20, color: 'white'}}>Find Boba!</Text>
          </TouchableOpacity>
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
    fontSize: 55,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    margin: 10,
  },

  button: {
    position: 'absolute',
    top: '65%',
    borderRadius: 7,
    padding: 10,
    backgroundColor: 'rgb(37, 160, 205)',
  }
});
